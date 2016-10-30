import {expect} from 'chai'

import Character from '../../src/hero/character'
import Characteristic from '../../src/hero/characteristic'

describe('Characteristic', function () {
  let char, character

  describe('constructor', function () {
    beforeEach(function () {
      character = new Character()
      character.characteristics.strength = 15
      char = new Characteristic(character, 'strength')
    })

    it('returns the value of the characteristic', function () {
      expect(char.value).to.equal(15)
    })

    it('returns the cost of the characteristic', function () {
      expect(char.cost).to.equal(5)
    })

    it('returns the characteristic roll', function () {
      expect(char.roll).to.equal('12-')
    })

    it('does not return a characteristic roll if the characteristic is not primary', function () {
      char = new Characteristic(character, 'stun')

      expect(char.roll).to.not.exist
    })
  })
})
