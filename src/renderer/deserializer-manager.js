/**
 * Manages the set of deserializers used for serialized state.
 *
 * A deserializer is any object that has a `name` attribute and a `deserialize` function. A
 * common approach is to register a constructor as the deserializer for its instances by adding a
 * `deserialize` class method. When your deserialize method is called it will be passed the
 * serialized state as the first argument and the {HeroEnvironment} object as the second argument.
 *
 * The serialized state is expected to contain a `__typeName` attribute that is the same as the
 * deserializer's name.
 */
export default class DeserializerManager {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
    this.deserializers = {}
  }

  /**
   * Adds deserializers to the set.
   *
   * * `deserializers` List of deserializers to be added
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
   * * `state` An {Object} containing serialized state
   *
   * Returns the deserialized {Object}.
   */
  deserialize (state) {
    if (this.deserializers[state['__typeName']]) {
      return this.deserializers[state['__typeName']].deserialize(state, this.heroEnv)
    } else {
      return state
    }
  }

  /**
   * Gets the deserializer for the type `name`.
   *
   * * `name` {String} of the type name
   *
   * Returns the deserializer for the given type.
   */
  get (name) {
    return this.deserializers[name]
  }

  /**
   * Returns the {Number} of deserializers being managed.
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
