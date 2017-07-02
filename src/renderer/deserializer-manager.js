/**
 * Manages the set of deserializers used for serialized state.
 *
 * A {@link Deserializer} is any object that has a `name` attribute and a `deserialize` function. A
 * common approach is to register a constructor as the deserializer for its instances by adding a
 * `deserialize` class method. When your deserialize method is called it will be passed the
 * serialized state as the first argument and the {@link HeroEnvironment} object as the second
 * argument.
 *
 * The serialized state is expected to contain a `__typeName` attribute that is the same as the
 * deserializer's name.
 *
 * An instance of this class is always available as `hero.deserializers`.
 *
 * ## Examples
 *
 * ```javascript
 * hero.deserializers.add(Character)
 *
 * let character = hero.deserializers.deserialize(characterData)
 * ```
 */
export default class DeserializerManager {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
    this.deserializers = {}
  }

  /**
   * Adds deserializers to the set.
   *
   * @param {Object[]} deserializers Deserializers to add
   */
  add (...deserializers) {
    this.validate(...deserializers)

    for (let deserializer of deserializers) {
      this.deserializers[deserializer.name] = deserializer
    }
  }

  /**
   * Deserializes a state object into a "real" object.
   *
   * @param {Object} state Serialized object state
   * @return {Object} Deserialized object state
   */
  deserialize (state) {
    if (this.deserializers[state['__typeName']]) {
      return this.deserializers[state['__typeName']].deserialize(state, this.heroEnv)
    } else {
      return state
    }
  }

  /**
   * Gets the deserializer for the named type.
   *
   * @param {String} name Name of the type to get the deserializer for
   * @return {Object} Deserializer for the named type
   */
  get (name) {
    return this.deserializers[name]
  }

  /**
   * Returns the {Number} of deserializers being managed.
   */

  /**
   * Returns the number of deserializers being managed.
   *
   * @return {Number} Count of deserializers being managed
   */
  getCount () {
    return Object.keys(this.deserializers).length
  }

  validate (...deserializers) {
    for (let deserializer of deserializers) {
      if (!(deserializer.name && deserializer.deserialize)) {
        throw new Error(`${deserializer} is not a deserializer`)
      }
    }
  }
}
