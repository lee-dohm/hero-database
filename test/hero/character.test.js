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
