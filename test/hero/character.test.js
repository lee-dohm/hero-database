import '../support'

import Character from '../../src/hero/character'
import HeroEnvironment from '../../src/renderer/hero-environment'

describe('Character', function () {
  let character, heroEnv

  beforeEach(function () {
    heroEnv = new HeroEnvironment()
  })

  describe('defaults', function () {
    beforeEach(function () {
      character = new Character({name: 'Test Character'}, heroEnv)
    })

    it('represents a 6th edition character', function () {
      expect(character.edition).to.equal('6E')
    })

    it('has a default name', function () {
      expect(character.name).to.equal('Test Character')
    })

    it('has a campaign info block', function () {
      expect(character.campaignInfo).to.exist
    })

    it('has a characteristics block', function () {
      expect(character.characteristics).to.exist
    })

    it('has a skills block', function () {
      expect(character.skills).to.exist
    })

    it('has a perks block', function () {
      expect(character.perks).to.exist
    })

    it('has a talents block', function () {
      expect(character.talents).to.exist
    })

    it('has a powers block', function () {
      expect(character.powers).to.exist
    })

    it('has a complications block', function () {
      expect(character.complications).to.exist
    })
  })

  describe('serialization', function () {
    beforeEach(function () {
      character = new Character('Test Character', heroEnv)
    })

    it('works', function () {
      const state = character.serialize()
      const newCharacter = Character.deserialize(state, heroEnv)

      expect(newCharacter).to.be.instanceof(Character)
      expect(newCharacter).to.deep.equal(character)
    })
  })
})
