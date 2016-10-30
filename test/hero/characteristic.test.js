import {expect} from 'chai'

import Character from '../../src/hero/character'
import Characteristic from '../../src/hero/characteristic'
import HeroEnvironment from '../../src/renderer/hero-environment'

describe('Characteristic', function () {
  let char, character, heroEnv

  beforeEach(function () {
    heroEnv = new HeroEnvironment()

    character = new Character('Test Character', heroEnv)
    character.characteristics.strength = 15
    char = new Characteristic(character, 'strength', heroEnv)
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
    char = new Characteristic(character, 'stun', heroEnv)

    expect(char.roll).to.not.exist
  })

  it('returns the humanized name of the characteristic', function () {
    expect(char.name).to.equal('Strength')
  })

  it('returns the abbreviation of the characteristic', function () {
    expect(char.abbrev).to.equal('STR')
  })

  it('allows the value of the characteristic to be set', function () {
    char.value = 42

    expect(char.value).to.equal(42)
  })

  it('reflects the new value in the other properties after setting it', function () {
    char.value = 42

    expect(char.cost).to.equal(32)
    expect(char.roll).to.equal('17-')
  })
})
