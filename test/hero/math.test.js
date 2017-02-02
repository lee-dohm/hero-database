import '../support'

import HeroMath from '../../src/hero/math'

describe('HeroMath', function () {
  describe('round', function () {
    it('rounds down on a fractional part of 0.4 or less', function () {
      expect(HeroMath.round(1.4, 'down')).to.equal(1)
    })

    it('rounds up on a fractional part of 0.6 or more', function () {
      expect(HeroMath.round(1.6, 'up')).to.equal(2)
    })

    it('rounds up on fractional part of 0.5 when direction is up', function () {
      expect(HeroMath.round(99.5, 'up')).to.equal(100)
    })

    it('rounds down on a fractional part of 0.5 when direction is down', function () {
      expect(HeroMath.round(99.5, 'down')).to.equal(99)
    })

    it('ignores direction when the fractional part is 0.6 or higher', function () {
      expect(HeroMath.round(99.6, 'down')).to.equal(100)
    })

    it('ignores direction when the fractional part is less than 0.5', function () {
      expect(HeroMath.round(99.4, 'up')).to.equal(99)
    })

    it('throws an exception if direction is not supplied', function () {
      const test = () => {
        HeroMath.round(99.5)
      }

      expect(test).to.throw()
    })
  })

  describe('characteristicRoll', function () {
    it('gives a roll of 11 for a value of 10', function () {
      expect(HeroMath.characteristicRoll(10)).to.equal(11)
    })

    it('gives a roll of 11 for a value of 12', function () {
      expect(HeroMath.characteristicRoll(12)).to.equal(11)
    })

    it('gives a roll of 12 for a value of 13', function () {
      expect(HeroMath.characteristicRoll(13)).to.equal(12)
    })

    it('gives a roll of 12 for a value of 15', function () {
      expect(HeroMath.characteristicRoll(15)).to.equal(12)
    })
  })
})
