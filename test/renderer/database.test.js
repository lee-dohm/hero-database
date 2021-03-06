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

    it('does not load hidden files', async function () {
      database = new Database(fixturePath('broken'), {})
      const items = await database.loadAllRecords()

      expect(items).to.have.lengthOf(1)
      expect(items[0].name).to.equal('First')
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

  describe('createRecord', function () {
    beforeEach(function () {
      database = new Database(tempPath, {})
    })

    it('creates a new record given an object', async function () {
      const record = await database.createRecord({name: 'New Record'})

      expect(record.name).to.equal('New Record')
      expect(record.filePath).to.equal(path.join(tempPath, 'new-record.character'))
      expect(record.data).to.deep.equal({name: 'New Record'})
    })

    it('creates a new record of the given type if given an object with enough info', async function () {
      const record = await database.createRecord({name: 'New Template', __typeName: 'template'})

      expect(record.name).to.equal('New Template')
      expect(record.filePath).to.equal(path.join(tempPath, 'new-template.template'))
      expect(record.data).to.deep.equal({name: 'New Template', __typeName: 'template'})
    })

    it('creates a blank character record if just a name is given', async function () {
      const record = await database.createRecord('New Record')

      expect(record.name).to.equal('New Record')
      expect(record.filePath).to.equal(path.join(tempPath, 'new-record.character'))
      expect(record.data).to.deep.equal({name: 'New Record'})
    })

    it('throws an error if no object or string is given', async function () {
      let caught = false

      try {
        await database.createRecord()
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })
  })

  describe('deleteRecord', function () {
    beforeEach(async function () {
      database = new Database(tempPath, {})
      await database.createRecord('Record To Be Deleted')
      await database.createRecord({name: 'Template To Be Deleted', __typeName: 'template'})
    })

    it('deletes the record with the given name', async function () {
      await database.deleteRecord('Record To Be Deleted')

      let caught = false

      try {
        await database.loadRecord('Record To Be Deleted')
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('deletes a record with the given name and type', async function () {
      await database.deleteRecord('Template To Be Deleted', 'template')

      let caught = false

      try {
        await database.loadRecord('Template To Be Deleted', 'template')
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('deletes the record by moving it to the trash path', async function () {
      await database.deleteRecord('Record To Be Deleted')

      expect(fs.existsSync(path.join(tempPath, 'trash', 'record-to-be-deleted.character'))).to.be.ok
    })

    it('does not care if the named record does not exist', async function () {
      await database.deleteRecord('Record That Does Not Exist')
    })
  })
})
