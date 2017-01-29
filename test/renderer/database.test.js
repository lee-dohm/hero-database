import '../support'

import fs from 'fs'
import path from 'path'
import rmfr from 'rmfr'
import temp from 'temp'

import Database from '../../src/renderer/database'
import {fixturePath} from '../test-helpers'

temp.track()

describe('Database', function () {
  let database, tempPath

  beforeEach(function () {
    tempPath = temp.path('hero-database')
  })

  afterEach(async function () {
    if (tempPath && fs.existsSync(tempPath)) {
      await rmfr(tempPath)
    }
  })

  describe('constructor', function () {
    beforeEach(function () {
      database = new Database(tempPath, {})
    })

    it('initializes the database path', function () {
      expect(database.getPath()).to.equal(tempPath)
    })

    it('creates the path if it does not exist', function () {
      expect(fs.existsSync(tempPath)).to.be.ok
    })

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

    it('initializes the hero environment', function () {
      const mockHeroEnv = {}
      database = new Database(tempPath, mockHeroEnv)

      expect(database.heroEnv).to.equal(mockHeroEnv)
    })
  })

  describe('loadAllRecords', function () {
    it('loads the list of records', async function () {
      database = new Database(fixturePath('three-characters'), {})
      const items = await database.loadAllRecords()

      expect(items).to.have.lengthOf(3)
      expect(items[0].name).to.equal('First')
      expect(items[1].name).to.equal('Second')
      expect(items[2].name).to.equal('Third')
    })
  })

  describe('loadRecord', function () {
    it('loads a single record', async function () {
      database = new Database(fixturePath('three-characters'), {})
      const item = await database.loadRecord('First')

      expect(item.name).to.equal('First')
      expect(item.filePath).to.equal(path.join(fixturePath('three-characters'), 'first.character'))
    })

    it('throws an error if a record with the name is not found', async function () {
      let caught = false
      database = new Database(fixturePath('three-characters'), {})

      try {
        await database.loadRecord('Not Found')
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })
  })

  describe('setItem', function () {
    beforeEach(function () {
      database = new Database(tempPath, {})
    })

    it('sets a single item', async function () {
      const item = { name: 'Test' }

      await database.setItem(item)
      const readItem = await database.loadRecord('Test')

      expect(readItem).to.be.ok
      expect(readItem.name).to.equal('Test')
      expect(readItem.filePath).to.equal(path.join(tempPath, 'test.character'))
    })

    it('throws an error if given an undefined value', async function () {
      let caught = false

      try {
        await database.setItem()
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('uses the serialize function on the object if it exists', async function () {
      const item = {
        name: 'Test',

        serialize: function () {
          return {
            name: this.name,
            serialized: true
          }
        }
      }

      await database.setItem(item)
      const readItem = await database.loadRecord('Test')

      expect(readItem.data.serialized).to.be.ok
    })

    it('dasherizes the name attribute to create the file name', async function () {
      const item = { name: 'Something Long With Spaces' }

      await database.setItem(item)
      const readItem = await database.loadRecord('Something Long With Spaces')

      expect(readItem.filePath).to.equal(path.join(tempPath, 'something-long-with-spaces.character'))
    })
  })
})
