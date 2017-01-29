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

  async getItem (name) {
    return Record.load(this.getPathForName(name), this.heroEnv)
  }

  async getItems () {
    const files = await fs.readdir(this.databasePath)

    const records = await Promise.all(files.map((file) => {
      return Record.load(path.join(this.databasePath, file), this.heroEnv)
    }))

    return records
  }

  getPath () {
    return this.databasePath
  }

  getPathForItem (item) {
    return this.getPathForName(item.name)
  }

  getPathForName (name) {
    return path.join(this.databasePath, `${_.trim(_.dasherize(name), '-')}.character`)
  }

  async setItem (item) {
    let serialized = null

    if (item.serialize) {
      serialized = JSON.stringify(item.serialize(), null, 2)
    } else {
      serialized = JSON.stringify(item, null, 2)
    }

    return fs.writeFile(this.getPathForItem(item), serialized)
  }
}
