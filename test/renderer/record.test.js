import '../support'
import {fixturePath} from '../test-helpers'

const promisify = require('promisify-node')
const fs = promisify('fs')

import path from 'path'
import rmfr from 'rmfr'
import temp from 'temp'

import InvalidRecordError from '../../src/renderer/invalid-record-error'
import Record from '../../src/renderer/record'

describe('Record', function () {
  let record

  describe('load', function () {
    it('stores the file path', async function () {
      record = await Record.load(fixturePath('simple-record.json'))

      expect(record.filePath).to.equal(fixturePath('simple-record.json'))
    })

    it('gets the name attribute from the file', async function () {
      record = await Record.load(fixturePath('simple-record.json'))

      expect(record.name).to.equal('foo')
    })

    it('throws an error when given an undefined path', async function () {
      let caught = false

      try {
        await Record.load(undefined)
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('throws an error if the file does not exist', async function () {
      let caught = false

      try {
        await Record.load(fixturePath('does-not-exist.json'))
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('throws an error if the file does not contain valid JSON', async function () {
      let err = null

      try {
        await Record.load(fixturePath('invalid.json'))
      } catch (e) {
        err = e
      }

      expect(fs.existsSync(fixturePath('invalid.json'))).to.be.ok
      expect(err).to.be.ok
      expect(err).to.be.instanceOf(SyntaxError)
    })

    it('throws an error if the record does not contain a name attribute', async function () {
      let err = null

      try {
        await Record.load(fixturePath('no-name-attribute.json'))
      } catch (e) {
        err = e
      }

      expect(fs.existsSync(fixturePath('no-name-attribute.json'))).to.be.ok
      expect(err).to.be.ok
      expect(err).to.be.instanceOf(InvalidRecordError)
    })
  })

  describe('deserialization', function () {
    let heroEnv, manager

    beforeEach(function () {
      manager = {
        deserialize: (state) => {
          state.deserialized = true
          return state
        }
      }

      heroEnv = {
        deserializers: manager
      }
    })

    it('deserializes the record on load when supplied with a HeroEnvironment', async function () {
      record = await Record.load(fixturePath('simple-record.json'), heroEnv)

      expect(record.data.deserialized).to.be.ok
    })
  })

  describe('store', function () {
    let tempPath

    beforeEach(async function () {
      tempPath = temp.path('hero-database')

      await fs.mkdir(tempPath)
    })

    afterEach(async function () {
      if (tempPath && fs.existsSync(tempPath)) {
        await rmfr(tempPath)
      }
    })

    it('writes the latest contents to the file path', async function () {
      let characterPath = path.join(tempPath, 'test.character')
      let record = new Record(characterPath, { name: 'Test' })

      await record.store()
      let data = JSON.parse(await fs.readFile(characterPath, 'utf8'))

      expect(fs.existsSync(characterPath)).to.be.ok
      expect(data.name).to.equal('Test')
    })

    it('calls the serialize function on the object if it exists', async function () {
      let characterPath = path.join(tempPath, 'test.character')
      let record = new Record(characterPath, {
        name: 'Test',
        serialize: () => {
          return {
            serialized: true
          }
        }
      })

      await record.store()
      let data = JSON.parse(await fs.readFile(characterPath, 'utf8'))

      expect(fs.existsSync(characterPath)).to.be.ok
      expect(data.serialized).to.be.ok
    })
  })
})
