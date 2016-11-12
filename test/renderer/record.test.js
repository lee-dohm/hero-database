import '../support'
import fs from 'fs'
import {fixturePath} from '../test-helpers'

import Record from '../../src/renderer/record'

describe('Record', function () {
  let record

  describe('constructor', function () {
    it('throws an error when given an undefined path', function () {
      const fn = () => { record = new Record(undefined) }

      expect(fn).to.throw()
      return record
    })

    it('stores the file path', function () {
      record = new Record(fixturePath('simple-record.json'))

      expect(record.filePath).to.equal(fixturePath('simple-record.json'))
    })

    it('gets the name attribute from the file', function () {
      record = new Record(fixturePath('simple-record.json'))

      expect(record.name).to.equal('foo')
    })

    it('throws an error if the file does not exist', function () {
      const fn = () => { record = new Record(fixturePath('does-not-exist.json')) }

      expect(fn).to.throw()
    })

    it('throws an error if the file does not contain valid JSON', function () {
      const fn = () => { record = new Record(fixturePath('invalid.json')) }

      expect(fs.existsSync(fixturePath('invalid.json'))).to.be.ok
      expect(fn).to.throw()
    })

    it('throws an error if the record does not contain a name attribute', function () {
      const fn = () => { record = new Record(fixturePath('no-name-attribute.json')) }

      expect(fs.existsSync(fixturePath('no-name-attribute.json'))).to.be.ok
      expect(fn).to.throw()
    })
  })
})
