import '../support'

import Block from '../../src/hero/block'
import DeserializationError from '../../src/hero/deserialization-error'

class TestBlock extends Block {
  constructor (data = {}) {
    super()

    Object.assign(this, data)
  }
}

describe('Block', function () {
  let block

  beforeEach(function () {
    block = new TestBlock({foo: 'bar'})
  })

  describe('serialization', function () {
    it('converts the object to JSON', function () {
      expect(block.serialize()).to.equal('{"type":"TestBlock","foo":"bar"}')
    })
  })

  describe('deserialization', function () {
    it('parses a JSON representation', function () {
      block.deserialize('{"type":"TestBlock","bar":"baz"}')

      expect(block.foo).to.not.exist
      expect(block.bar).to.equal('baz')
    })

    it('throws an exception when the block type doesn\'t match', function () {
      let fn = () => { block.deserialize('{}') }

      expect(fn).to.throw(DeserializationError)
    })
  })
})
