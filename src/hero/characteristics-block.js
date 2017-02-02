/**
 * A block that represents information on the characteristics of the character.
 */
export default class CharacteristicsBlock {
  static deserialize (state, heroEnv) {
    return new CharacteristicsBlock(state, heroEnv)
  }

  /**
   * Constructs a default set of characteristics.
   *
   * * `state` *(optional)* {Object} containing serialized state
   */
  constructor (state = {}, heroEnv = hero) {
    this.heroEnv = heroEnv

    Object.assign(this, this.getDefaultBaseCharacteristics(), state)
  }

  serialize () {
    return Object.assign({}, this, {heroEnv: undefined})
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
