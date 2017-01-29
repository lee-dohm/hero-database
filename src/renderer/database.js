const promisify = require('promisify-node')
const fs = promisify('fs')

import path from 'path'
import _ from 'underscore.string'

import Record from './record'

/**
 * The hero database itself.
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
   * Gets the single item from the database given its `name`.
   *
   * * `name` {String} containing the name of the item to retrieve from the database.
   *
   * Returns the {Record} containing the item.
   */
  async loadRecord (name) {
    return Record.load(this.getPathForName(name), this.heroEnv)
  }

  /**
   * Gets all of the items from the database.
   *
   * Returns an {Array} of all {Record} objects contained in the database.
   */
  async loadAllRecords () {
    const files = await fs.readdir(this.databasePath)

    const records = await Promise.all(files.map((file) => {
      return Record.load(path.join(this.databasePath, file), this.heroEnv)
    }))

    return records
  }

  /**
   * Gets the path to the database.
   */
  getPath () {
    return this.databasePath
  }

  getPathForRecord (item) {
    return this.getPathForName(item.name)
  }

  getPathForName (name) {
    return path.join(this.databasePath, `${_.trim(_.dasherize(name), '-')}.character`)
  }
}
