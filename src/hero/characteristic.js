import Format from './format'
import HeroMath from './math'
import Utilities from '../app/utilities'

export default class Characteristic {
  constructor (character, charName) {
    this.character = character
    this.charName = charName
  }

  get cost () {
    return (this.value - this.info.base) * this.info.multiplier
  }

  get roll () {
    if (this.info.primary) {
      return Format.roll(9 + HeroMath.round(this.value / 5))
    }
  }

  get value () {
    return this.character.characteristics[this.charName]
  }

  get info () {
    if (!this.charInfo) {
      let info = Utilities.getDataFile('characteristics')
      this.charInfo = info[this.charName]
    }

    return this.charInfo
  }
}
