import fs from 'fs'
import path from 'path'

const {app} = require('electron').remote

export default class HeroEnvironment {
  constructor () {
    this.appPath = app.getAppPath()
    this.documentPath = app.getPath('documents')
  }

  getAppPath () {
    if (process.env.HERO_DATABASE_HOME) {
      return process.env.HERO_DATABASE_HOME
    } else {
      return this.appPath
    }
  }

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

  getDocumentPath () {
    return this.documentPath
  }
}
