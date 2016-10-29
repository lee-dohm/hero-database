import {expect} from 'chai'

import HeroMath from '../../src/hero/math'

describe('HeroMath', function () {
  describe('round', function () {
    it('rounds down on a fractional part of 0.4 or less', function () {
      expect(HeroMath.round(1.4)).to.equal(1)
    })

    it('rounds up on a fractional part of 0.6 or more', function () {
      expect(HeroMath.round(1.6)).to.equal(2)
    })

    it('rounds up on fractional part of 0.5 when direction is up', function () {
      expect(HeroMath.round(99.5, 'up')).to.equal(100)
    })

    it('rounds down on a fractional part of 0.5 when direction is down', function () {
      expect(HeroMath.round(99.5, 'down')).to.equal(99)
    })
  })
})
