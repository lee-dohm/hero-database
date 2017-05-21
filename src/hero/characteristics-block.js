import Model from './model'

/**
 * A block that represents information on the characteristics of the character.
 *
 * The characteristics are each available as a property and are:
 *
 * * `strength`
 * * `dexterity`
 * * `constitution`
 * * `intelligence`
 * * `ego`
 * * `presence`
 * * `offensiveCombatValue`
 * * `defensiveCombatValue`
 * * `offensiveMentalCombatValue`
 * * `defensiveMentalCombatValue`
 * * `speed`
 * * `physicalDefense`
 * * `energyDefense`
 * * `recovery`
 * * `endurance`
 * * `body`
 * * `stun`
 *
 * See {6E1 40} for more information.
 *
 */
export default class CharacteristicsBlock extends Model {
  static deserialize (state, heroEnv) {
    return new CharacteristicsBlock(state, heroEnv)
  }

  /**
   * Constructs a default set of characteristics.
   *
   * * `state` *(optional)* {Object} containing serialized state
   */
  constructor (state = {}, heroEnv = hero) {
    super(heroEnv)

    Object.assign(this, this.getDefaultBaseCharacteristics(), state, {heroEnv})
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
