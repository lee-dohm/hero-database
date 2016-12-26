import '../support'

import fs from 'fs'
import path from 'path'
import temp from 'temp'

import Database from '../../src/renderer/database'
import {fixturePath} from '../test-helpers'

const rimraf = require('rimraf')

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

  describe('getItems', function () {
    it('gets the list of items', async function () {
      database = new Database(fixturePath('three-characters'), {})
      let items = await database.getItems()

      expect(items).to.have.lengthOf(3)
      expect(items[0].name).to.equal('First')
      expect(items[1].name).to.equal('Second')
      expect(items[2].name).to.equal('Third')
    })
  })

  describe('getItem', function () {
    it('gets a single item', async function () {
      database = new Database(fixturePath('three-characters'), {})
      let item = await database.getItem('First')

      expect(item.name).to.equal('First')
      expect(item.filePath).to.equal(path.join(fixturePath('three-characters'), 'first.character'))
    })

    it('throws an error if a record with the name is not found', async function () {
      let caught = false
      let database = new Database(fixturePath('three-characters'), {})

      try {
        await database.getItem('Not Found')
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })
  })
})
