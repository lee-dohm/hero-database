import {humanize, titleize} from 'underscore.string'

import Format from './format'
import HeroMath from './math'

/**
 * View model for characteristics.
 */
export default class Characteristic {
  /**
   * Creates a view model for the `characteristic` on `character`.
   */
  constructor (character, characteristic, heroEnv = hero) {
    this.heroEnv = heroEnv

    this.character = character
    this.charName = characteristic
  }

  /**
   * Returns a {String} containing the abbreviation of the characteristic
   */
  get abbrev () {
    return this.info.abbrev
  }

  /**
   * Returns the cost of the characteristic in Character Points as a {Number}
   */
  get cost () {
    return this.character.characteristics.getCost(this.charName)
  }

  /**
   * Returns the name of the characteristic formatted for display as a {String}
   */
  get name () {
    return titleize(humanize(this.charName))
  }

  /**
   * Returns the characteristic roll as a {String}
   */
  get roll () {
    if (this.info.primary) {
      return Format.roll(HeroMath.characteristicRoll(this.value))
    }
  }

  /**
   * Returns the {Number} value of the characteristic
   */
  get value () {
    return this.character.characteristics[this.charName]
  }

  /**
   * Sets the {Number} value of the characteristic
   */
  set value (val) {
    this.character.characteristics[this.charName] = val
  }

  get info () {
    if (!this.charInfo) {
      let info = this.heroEnv.getData('characteristics')
      this.charInfo = info[this.charName]
    }

    return this.charInfo
  }
}
