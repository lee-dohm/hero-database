import {app} from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * General utilities for the app.
 *
 * Usable in both the main and renderer processes.
 */
export default class Utilities {
  /**
   * Gets the named data file.
   *
   * Returns the {Object} containing the information from the file.
   */
  static getDataFile (name) {
    return JSON.parse(fs.readFileSync(path.join(this.getDataPath(), `${name}.json`)))
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
