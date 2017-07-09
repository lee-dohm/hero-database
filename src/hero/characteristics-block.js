import HeroMath from './math'
import Model from './model'

/**
 * A block that represents information on the characteristics of the character.
 *
 * The characteristics are each available as a property. The list of characteristics is available in
 * `data/characteristics.json`.
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

  /**
   * Gets the cost of an individual characteristic.
   *
   * @param {String} char Name of the characteristic
   * @return {Number} Cost of the characteristic at its current value
   * @see {@link HeroMath.characteristicCost}
   */
  getCost (char) {
    const info = this.heroEnv.getData('characteristics')

    return HeroMath.characteristicCost(this[char], info[char])
  }

  /**
   * Calculates the total cost of the characteristics.
   *
   * @return {Number} Total cost of characteristics in Character Points.
   */
  getTotalCost () {
    const info = this.heroEnv.getData('characteristics')
    let total = 0

    for (let char in info) {
      total += this.getCost(char)
    }

    return total
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
