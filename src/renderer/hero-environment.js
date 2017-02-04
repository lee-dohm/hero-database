import {Emitter} from 'event-kit'
import fs from 'fs'
import path from 'path'

const {app} = require('electron').remote

import Character from '../hero/character'
import Database from './database'
import DeserializerManager from './deserializer-manager'
import Pane from './pane'
import Workspace from './workspace'

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
    this.documentPath = path.join(app.getPath('documents'), 'hero-database')
    this.emitter = new Emitter()

    this.database = new Database(this.documentPath, this)
    this.deserializers = new DeserializerManager(this)
    this.pane = new Pane(this)
    this.workspace = new Workspace(this)

    this.addDefaultDeserializers()
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

  addDefaultDeserializers () {
    this.deserializers.add(Character)
  }

  start () {
    this.workspace.attachViews()
  }
}
