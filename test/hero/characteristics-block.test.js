import {expect} from 'chai'

import CharacteristicsBlock from '../../src/hero/characteristics-block'

describe('CharacteristicsBlock', function () {
  let block

  describe('defaults', function () {
    beforeEach(function () {
      block = new CharacteristicsBlock()
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
      expect(block.ocv).to.equal(3)
    })

    it('to a DCV of 3', function () {
      expect(block.dcv).to.equal(3)
    })

    it('to a OMCV of 3', function () {
      expect(block.omcv).to.equal(3)
    })

    it('to a DMCV of 3', function () {
      expect(block.dmcv).to.equal(3)
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
      block = new CharacteristicsBlock({stun: 300})

      expect(block.stun).to.equal(300)
    })
  })
})