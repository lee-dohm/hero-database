const promisify = require('promisify-node')
const fs = promisify('fs')

import {Emitter} from 'event-kit'
import path from 'path'
import _ from 'underscore.string'

import Record from './record'

/**
 * The hero database itself.
 *
 * The database consists of {@link Record} objects. Every record is addressed by a human-readable
 * name that is mapped to a file name by the {@link Database}. Every name in the database must be
 * unique. **Please note:** Two human-readable names are considered equivalent if their mapped file
 * names are equal to each other.
 *
 * A single instance of this is always available as `hero.database`.
 */
export default class Database {
  /**
   * Opens the database at the given path, creating it if necessary.
   *
   * @param {String} databasePath Path to where the database is stored
   * @param {HeroEnvironment} heroEnv Application environment
   */
  constructor (databasePath, heroEnv) {
    if (!databasePath) {
      throw new Error('Database path cannot be undefined')
    }

    if (!heroEnv) {
      throw new Error('Hero environment cannot be undefined')
    }

    this.emitter = new Emitter()
    this.heroEnv = heroEnv
    this.databasePath = databasePath

    this.create()
  }

  /**
   * Raised when a record is created in the database.
   *
   * @event Database#onDidCreateRecord
   * @see Database~createRecordCallback
   */

  /**
   * Callback function for the {@link Database#event:onDidCreateRecord} event.
   *
   * @callback Database~createRecordCallback
   * @param {Record} record Record that was created
   */

  /**
   * Subscribes to the {@link Database#event:onDidCreateRecord} event.
   *
   * @param {Database~createRecordCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidCreateRecord (callback) {
    return this.emitter.on('did-create-record', callback)
  }

  /**
   * Raised when a record is deleted in the database.
   *
   * @event Database#onDidDeleteRecord
   * @see Database~deleteRecordCallback
   */

  /**
   * Callback function for the {@link Database#event:onDidDeleteRecord} event.
   *
   * @callback Database~deleteRecordCallback
   * @param {String} path On-disk path the record was deleted from.
   */

  /**
   * Subscribes to the {@link Database#event:onDidDeleteRecord} event.
   *
   * @param {Database~deleteRecordCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidDeleteRecord (callback) {
    return this.emitter.on('did-delete-record', callback)
  }

  /**
   * Raised when a record is loaded from the database.
   *
   * @event Database#onDidLoadRecord
   * @see Database~loadRecordCallback
   */

  /**
   * Callback function for the {@link Database#event:onDidLoadRecord} event.
   *
   * @callback Database~loadRecordCallback
   * @param {Record} record Record that was loaded
   */

  /**
   * Subscribes to the {@link Database#event:onDidLoadRecord} event.
   *
   * @param {Database~loadRecordCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidLoadRecord (callback) {
    return this.emitter.on('did-load-record', callback)
  }

  /**
   * Raised when all records are loaded from the database.
   *
   * @event Database#onDidLoadAllRecords
   * @see Database~loadAllRecordsCallback
   */

  /**
   * Callback function for the {@link Database#event:onDidLoadAllRecords} event.
   *
   * @callback Database~loadAllRecordsCallback
   * @param {Record[]} records Records that were loaded from the database
   */

  /**
   * Raised when all records are loaded from the database.
   *
   * @param {Function} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidLoadAllRecords (callback) {
    return this.emitter.on('did-load-all-records', callback)
  }

  create () {
    if (!fs.existsSync(this.databasePath)) {
      fs.mkdirSync(this.databasePath)
    }
  }

  /**
   * Deletes a record.
   *
   * Doesn't actually delete the named record but moves it to the `trash` folder within the database
   * directory.
   *
   * @param {String} name containing the name of the record to delete
   * @param {String} [type] containing the type of the record to delete
   */
  async deleteRecord (name, type) {
    if (!fs.existsSync(this.getTrashPath())) {
      await fs.mkdir(this.getTrashPath())
    }

    let contents
    let originalPath

    try {
      originalPath = this.getPathForName(name, type)
      contents = await fs.readFile(originalPath)
    } catch (err) {
      if (err.message && err.message.match(/ENOENT/)) {
        return
      } else {
        throw err
      }
    }

    await fs.writeFile(this.getPathForName(name, type, this.getTrashPath()), contents)
    await fs.unlink(originalPath)

    this.emitter.emit('did-delete-record', originalPath)
  }

  /**
   * Gets the path to the database.
   *
   * @returns {String}
   */
  getPath () {
    return this.databasePath
  }

  getPathForRecord (item) {
    return this.getPathForName(item.name, item.__typeName)
  }

  getPathForName (name, type = 'character', root = this.databasePath) {
    return path.join(root, `${_.trim(_.dasherize(name), '-')}.${type}`)
  }

  getTrashPath () {
    return path.join(this.databasePath, 'trash')
  }

  /**
   * Gets the named record from the database.
   *
   * @param {String} name Name of the record
   * @param {String} [type] Type of the record
   * @return {Promise<Record>} Record that was loaded
   */
  async loadRecord (name, type) {
    const record = await Record.load(this.getPathForName(name, type), this.heroEnv)

    this.emitter.emit('did-load-record', record)

    return record
  }

  /**
   * Gets all of the items from the database.
   *
   * Returns an {Array} of all {Record} objects contained in the database.
   */

  /**
   * Loads all records from the database.
   *
   * @return {Promise<Array<Record>>} All records from the database
   */
  async loadAllRecords () {
    let files = await fs.readdir(this.databasePath)
    files = files.filter((file) => { return !path.basename(file).startsWith('.') })

    const records = await Promise.all(files.map((file) => {
      return Record.load(path.join(this.databasePath, file), this.heroEnv)
    }))

    this.emitter.emit('did-load-all-records', records)

    return records
  }

  /**
   * Creates a new record in the database.
   *
   * @param {string|Object} data Name of the new record or an object with the following properties:
   * @param {String} data.name Name of the new record
   * @param {String} data.__typeName Name of the record's type
   * @return {Promise<Record>} Record that was created
   */
  async createRecord (data) {
    let record

    if (data && data.name) {
      record = new Record(this.getPathForName(data.name, data.__typeName), data)
    } else if (typeof data === 'string') {
      record = new Record(this.getPathForName(data), {name: data})
    } else {
      throw new Error('data must be either an Object with a name attribute or a String')
    }

    await record.store()

    this.emitter.emit('did-create-record', record)

    return record
  }
}
