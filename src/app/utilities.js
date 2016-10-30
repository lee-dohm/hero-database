import {app} from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * General utilities for the app.
 */
export default class Utilities {
  /**
   * Returns the {Object} containing the information from the file.
   */
  static getDataFile (name) {
    return JSON.parse(fs.readFileSync(path.join(this.getDataPath(), `${name}.json`)))
  }

  /**
   * Returns the {String} containing the path where Hero Database documents are stored.
   */
  static getDocumentPath () {
    return path.join(app.getPath('documents'), 'hero-database')
  }

  static getAppPath () {
    let appPath = app.getAppPath()

    if (process.env.HERO_DATABASE_HOME) {
      appPath = process.env.HERO_DATABASE_HOME
    }

    return appPath
  }

  static getDataPath () {
    return path.join(this.getAppPath(), 'data')
  }
}
