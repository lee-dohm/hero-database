import '../support'

import CharacteristicsBlock from '../../src/hero/characteristics-block'
import HeroEnvironment from '../../src/renderer/hero-environment'

describe('CharacteristicsBlock', function () {
  let block, heroEnv

  beforeEach(function () {
    heroEnv = new HeroEnvironment()
  })

  describe('defaults', function () {
    beforeEach(function () {
      block = new CharacteristicsBlock({}, heroEnv)
    })

    it('to a strength of 10', function () {
      expect(block.strength).to.equal(10)
    })

    it('to a dexterity of 10', function () {
      expect(block.dexterity).to.equal(10)
    })

    it('to a constitution of 10', function () {
      expect(block.constitution).to.equal(10)
    })

    it('to an intelligence of 10', function () {
      expect(block.intelligence).to.equal(10)
    })

    it('to an ego of 10', function () {
      expect(block.ego).to.equal(10)
    })

    it('to a presence of 10', function () {
      expect(block.presence).to.equal(10)
    })

    it('to an OCV of 3', function () {
      expect(block.offensiveCombatValue).to.equal(3)
    })

    it('to a DCV of 3', function () {
      expect(block.defensiveCombatValue).to.equal(3)
    })

    it('to a OMCV of 3', function () {
      expect(block.offensiveMentalCombatValue).to.equal(3)
    })

    it('to a DMCV of 3', function () {
      expect(block.defensiveMentalCombatValue).to.equal(3)
    })

    it('to a speed of 2', function () {
      expect(block.speed).to.equal(2)
    })

    it('to a physicalDefense of 2', function () {
      expect(block.physicalDefense).to.equal(2)
    })

    it('to a energyDefense of 2', function () {
      expect(block.energyDefense).to.equal(2)
    })

    it('to a recovery of 4', function () {
      expect(block.recovery).to.equal(4)
    })

    it('to a endurance of 20', function () {
      expect(block.endurance).to.equal(20)
    })

    it('to a body of 10', function () {
      expect(block.body).to.equal(10)
    })

    it('to a stun of 20', function () {
      expect(block.stun).to.equal(20)
    })
  })

  describe('constructor', function () {
    it('allows you to override the defaults', function () {
      block = new CharacteristicsBlock({stun: 300}, heroEnv)

      expect(block.stun).to.equal(300)
    })
  })

  describe('serialization', function () {
    beforeEach(function () {
      block = new CharacteristicsBlock({}, heroEnv)
      block.stun = 300
    })

    it('works', function () {
      const state = block.serialize()
      const newBlock = CharacteristicsBlock.deserialize(state, heroEnv)

      expect(newBlock).to.be.instanceof(CharacteristicsBlock)
      expect(newBlock.stun).to.equal(300)
    })
  })

  describe('calculating cost', function () {
    beforeEach(function () {
      block = new CharacteristicsBlock({}, heroEnv)
    })

    it('returns zero for default values', function () {
      expect(block.getTotalCost()).to.equal(0)
    })

    it('calculates the cost of a single characteristic', function () {
      block.strength = 20

      expect(block.getTotalCost()).to.equal(10)
    })

    it('calculates the total cost of multiple characteristics', function () {
      block.strength = 20
      block.dexterity = 20
      block.constitution = 20
      block.intelligence = 20

      expect(block.getTotalCost()).to.equal(10 + 20 + 10 + 10)
    })
  })
})
