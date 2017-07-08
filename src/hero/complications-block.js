import Model from './model'

/**
 * A {@link Block} containing the list of {@link Complication Complications} that the character has
 * taken.
 *
 * The cost of the complications block is the sum of the cost of each complication.
 *
 * @hero 6E1 414 Character Complications
 */
export default class ComplicationsBlock extends Model {
  /**
   * Deserializes the info block.
   *
   * @param {Object} state Serialized info block
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {ComplicationsBlock} Deserialized info block
   */
  static deserialize (state, heroEnv) {
    return new ComplicationsBlock(state, heroEnv)
  }
}
