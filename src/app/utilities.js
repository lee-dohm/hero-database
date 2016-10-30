import {app} from 'electron'
import fs from 'fs'
import path from 'path'

export default class Utilities {
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

  static getDataFile (name) {
    return JSON.parse(fs.readFileSync(path.join(this.getDataPath(), `${name}.json`)))
  }
}
