import '../support'
import fs from 'fs'
const rimraf = require('rimraf')
import temp from 'temp'

import Database from '../../src/renderer/database'
import {fixturePath} from '../test-helpers'

temp.track()

describe('Database', function () {
  let database, tempPath

  beforeEach(function () {
    tempPath = temp.path('hero-database')
  })

  afterEach(function () {
    return new Promise((resolve, reject) => {
      if (tempPath && fs.existsSync(tempPath)) {
        rimraf(tempPath, resolve)
      } else {
        resolve()
      }
    })
  })

  describe('constructor', function () {
    it('throws an error when given an undefined database path', function () {
      const fn = () => { database = new Database(undefined, {}) }

      expect(fn).to.throw()
    })

    it('throws an error when given an empty database path', function () {
      const fn = () => { database = new Database('', {}) }

      expect(fn).to.throw()
    })

    it('throws an error when given an undefined hero environment', function () {
      const fn = () => { database = new Database(tempPath, undefined) }

      expect(fn).to.throw()
    })

    it('initializes the database path', function () {
      database = new Database(tempPath, {})

      expect(database.getPath()).to.equal(tempPath)
    })

    it('initializes the hero environment', function () {
      let mockHeroEnv = {}
      database = new Database(tempPath, mockHeroEnv)

      expect(database.heroEnv).to.equal(mockHeroEnv)
    })

    it('creates the path if it does not exist', function () {
      database = new Database(tempPath, {})

      expect(fs.existsSync(tempPath)).to.be.ok
    })
  })

  it('gets the list of items', function () {
    database = new Database(fixturePath('three-characters'), {})
    let items = database.getItems()

    expect(items).to.eventually.have.lengthOf(3)
  })
})
