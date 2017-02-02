import '../support'

import Format from '../../src/hero/format'

describe('Format', function () {
  describe('roll', function () {
    it('formats a standard die roll properly', function () {
      expect(Format.roll(15)).to.equal('15-')
    })
  })
})
