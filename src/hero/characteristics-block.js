import Block from './block'

/**
 * A block that represents information on the characteristics of the character.
 */
export default class CharacteristicsBlock extends Block {
  /**
   * Constructs a default set of characteristics.
   *
   * * `overrides` - an {Object} containing values to override from the defaults
   */
  constructor (overrides = {}, heroEnv = hero) {
    super()

    this.heroEnv = heroEnv

    Object.assign(this, this.getDefaultBaseCharacteristics(), overrides)
  }

  getDefaultBaseCharacteristics () {
    const defaults = this.heroEnv.getData('characteristics')
    let defaultBases = {}

    for (let prop in defaults) {
      defaultBases[prop] = defaults[prop].base
    }

    return defaultBases
  }
}
