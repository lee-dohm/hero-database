import fs from 'fs'
import path from 'path'

const {app} = require('electron').remote

/**
 * Global utility class for storing information about the environment in which the application is
 * running.
 */
export default class HeroEnvironment {
  /**
   * Creates a standard environment.
   */
  constructor () {
    this.appPath = app.getAppPath()
    this.documentPath = app.getPath('documents')
  }

  /**
   * Returns the {String} path in which the application is installed.
   */
  getAppPath () {
    if (process.env.HERO_DATABASE_HOME) {
      return process.env.HERO_DATABASE_HOME
    } else {
      return this.appPath
    }
  }

  /**
   * Returns an {Object} containing data that is bundled with the application.
   */
  getData (name) {
    const dataPath = this.getDataPath(name)

    return JSON.parse(fs.readFileSync(dataPath))
  }

  getDataPath (file) {
    let dataPath = path.join(this.getAppPath(), 'data')

    if (file) {
      dataPath = path.join(dataPath, `${file}.json`)
    }

    return dataPath
  }

  /**
   * Returns the {String} path to where the application will store its documents.
   */
  getDocumentPath () {
    return this.documentPath
  }
}
