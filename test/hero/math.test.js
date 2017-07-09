import '../support'

import HeroEnvironment from '../../src/renderer/hero-environment'
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

  describe('characteristicCost', function () {
    let heroEnv
    let info

    beforeEach(function () {
      heroEnv = new HeroEnvironment()
      info = heroEnv.getData('characteristics')
    })

    it('returns zero for a base characteristic value', function () {
      expect(HeroMath.characteristicCost(10, info['strength'])).to.equal(0)
    })

    it('returns the appropriate amount for a value above the base', function () {
      expect(HeroMath.characteristicCost(20, info['strength'])).to.equal(10)
    })

    it('returns a negative cost for values below the base', function () {
      expect(HeroMath.characteristicCost(5, info['strength'])).to.equal(-5)
    })

    it('throws an error for a characteristic below 0', function () {
      expect(() => {
        HeroMath.characteristicCost(-1, info['strength'])
      }).to.throw(RangeError)
    })

    it('rounds up all fractional costs to the nearest whole number of character points', function () {
      expect(HeroMath.characteristicCost(21, info['endurance'])).to.equal(1)
    })
  })

  describe('activeCost', function () {
    it('returns the same as base cost if there are no advantages applied', function () {
      expect(HeroMath.activeCost(30, [])).to.equal(30)
    })

    it('returns one plus the sum of the advantages multiplied by the base cost', function () {
      expect(HeroMath.activeCost(30, [0.25, 0.25, 0.25, 0.25])).to.equal(60)
    })

    it('rounds half points down', function () {
      expect(HeroMath.activeCost(30, [0.25])).to.equal(37)
    })

    it('rounds fractions above half up', function () {
      expect(HeroMath.activeCost(55, [0.25])).to.equal(69)
    })

    it('rounds fractions below half down', function () {
      expect(HeroMath.activeCost(9, [0.25])).to.equal(11)
    })
  })

  describe('realCost', function () {
    it('returns the same as the active cost if there are no limitations applied', function () {
      expect(HeroMath.realCost(30, [])).to.equal(30)
    })

    it('returns the active cost divided by one plus the sum of the limitations', function () {
      expect(HeroMath.realCost(30, [0.25, 0.25, 0.25, 0.25])).to.equal(15)
    })

    it('rounds half points down', function () {
      expect(HeroMath.realCost(25, [1])).to.equal(12)
    })

    it('rounds fractions above half up', function () {
      expect(HeroMath.realCost(51, [0.25])).to.equal(41)
    })

    it('rounds fractions below half down', function () {
      expect(HeroMath.realCost(53, [0.25])).to.equal(42)
    })
  })
})
