import fs from 'fs'

/**
 * The hero database itself.
 *
 * A single instance of this is always available as `hero.database`.
 */
export default class Database {
  constructor (databasePath, heroEnv) {
    this.heroEnv = heroEnv
    this.databasePath = databasePath

    this.items = []
  }

  create () {
    if (!fs.existsSync(this.databasePath)) {
      fs.mkdirSync(this.databasePath)
    }
  }
}
