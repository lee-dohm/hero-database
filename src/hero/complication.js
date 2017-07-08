import Model from './model'

/**
 * Represents a single complication on the character.
 *
 * A complication consists of:
 *
 * * Complication name
 * * Description
 * * Options
 *
 * Example:
 *
 * > An Ogre Beserker has the Enraged complication that affects them when in combat with
 * a chance to become enraged of 11- and a chance to recover of 11- for 20 character points.
 *
 * That would be represented by:
 *
 * ```javascript
 * {
 *   "name": "enraged",
 *   "description": "when in combat",
 *   "options": {
 *     "frequency": "Common",
 *     "berserk": false,
 *     "chanceToBecomeEnraged": "11-",
 *     "chanceToRecover": "11-"
 *   }
 * }
 * ```
 *
 * The `options` object must have a value for each option in the complications definition in
 * `data/complications.json`. An option can either be a selection with a string value as seen with
 * the `frequency` option above or a Boolean flag as seen with the `berserk` option.
 *
 * The `options` combined with the information in `data/complications.json` determines the cost of
 * the complication.
 *
 * @hero 6E1 414 Character Complications
 */
export default class Complication extends Model {
  /**
   * Deserializes the info block.
   *
   * @param {Object} state Serialized complication information
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {Complication} Deserialized complication
   */
  static deserialize (state, heroEnv) {
    return new Complication(state, heroEnv)
  }
}
