import {expect} from 'chai'

import Character from '../../src/hero/character'

describe('Character', function () {
  let character

  describe('defaults', function () {
    beforeEach(function () {
      character = new Character()
    })

    it('represents a 6th edition character', function () {
      expect(character.edition).to.equal('6E')
    })

    it('has a default name', function () {
      expect(character.name).to.equal('Unnamed Character')
    })

    it('has a campaign info block', function () {
      expect(character.campaignInfo).to.exist
    })
  })
})