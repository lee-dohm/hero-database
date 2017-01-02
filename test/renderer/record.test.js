import '../support'
import fs from 'fs'
import {fixturePath} from '../test-helpers'

import InvalidRecordError from '../../src/renderer/invalid-record-error'
import Record from '../../src/renderer/record'

describe('Record', function () {
  let record

  describe('load', function () {
    it('throws an error when given an undefined path', async function () {
      let caught = false

      try {
        await Record.load(undefined)
      } catch (err) {
        caught = true
      }

      expect(caught).to.be.ok
    })

    it('stores the file path', async function () {
      record = await Record.load(fixturePath('simple-record.json'))

      expect(record.filePath).to.equal(fixturePath('simple-record.json'))
    })

    it('gets the name attribute from the file', async function () {
      record = await Record.load(fixturePath('simple-record.json'))

      expect(record.name).to.equal('foo')
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
})
