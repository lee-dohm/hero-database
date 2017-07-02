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
 * @hero 6E1 40 Characteristics
 */
export default class CharacteristicsBlock extends Model {
  /**
   * Deserializes the info block.
   *
   * @param {Object} state Serialized information
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {CharacteristicsBlock} Deserialized info block
   */
  static deserialize (state, heroEnv) {
    return new CharacteristicsBlock(state, heroEnv)
  }

  /**
   * Constructs a default set of characteristics.
   *
   * @param {Object} [state] Initial values
   * @param {HeroEnvironment} [heroEnv] Application environment
   */
  constructor (state = {}, heroEnv = hero) {
    super(heroEnv)

    Object.assign(this, this.getDefaultBaseCharacteristics(), state, {heroEnv})
  }

  /**
   * Serializes the info block for storage on disk.
   *
   * @return {Object} Serialized information
   */
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
