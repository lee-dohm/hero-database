import fs from 'fs'
import path from 'path'

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

  getItems () {
    return new Promise((resolve, reject) => {
      fs.readdir(this.databasePath, (err, files) => {
        if (err) {
          return reject(err)
        }

        let records = []
        for (let p of files) {
          records.push(new Record(path.join(this.databasePath, p)))
        }

        resolve(records)
      })
    })
  }

  getPath () {
    return this.databasePath
  }
}
