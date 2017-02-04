const promisify = require('promisify-node')
const fs = promisify('fs')

import {Emitter} from 'event-kit'
import path from 'path'
import _ from 'underscore.string'

import Record from './record'

/**
 * The hero database itself.
 *
 * The database consists of {Record} objects. Every record is addressed by a human-readable name
 * that is mapped to a file name by the {Database}. Every name in the database must be unique.
 * **Please note:** Two human-readable names are considered equivalent if their mapped file names
 * are equal to each other.
 *
 * A single instance of this is always available as `hero.database`.
 */
export default class Database {
  /**
   * Opens the database at the given path, creating it if necessary.
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
   * * `name` {String} containing the name of the record to delete
   * * `type` *(optional)* {String} containing the type of the record to delete
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
  }

  /**
   * Gets the path to the database.
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
   * Gets the single item from the database given its `name`.
   *
   * * `name` {String} containing the name of the item to retrieve from the database
   * * `type` *(optional)* {String} containing the record type
   *
   * Returns the {Record} containing the item.
   */
  async loadRecord (name, type) {
    return Record.load(this.getPathForName(name, type), this.heroEnv)
  }

  /**
   * Gets all of the items from the database.
   *
   * Returns an {Array} of all {Record} objects contained in the database.
   */
  async loadAllRecords () {
    let files = await fs.readdir(this.databasePath)
    files = files.filter((file) => { return !path.basename(file).startsWith('.') })

    const records = await Promise.all(files.map((file) => {
      return Record.load(path.join(this.databasePath, file), this.heroEnv)
    }))

    return records
  }

  /**
   * Creates a new record in the database.
   *
   * * `data` Either a {String} containing the name of the new record or an {Object} with a `name`
   * and optional `__typeName` attribute
   *
   * Returns a new {Record}.
   */
  async newRecord (data) {
    let record

    if (data && data.name) {
      record = new Record(this.getPathForName(data.name, data.__typeName), data)
    } else if (typeof data === 'string') {
      record = new Record(this.getPathForName(data), {name: data})
    } else {
      throw new Error('data must be either an Object with a name attribute or a String')
    }

    await record.store()

    return record
  }
}
