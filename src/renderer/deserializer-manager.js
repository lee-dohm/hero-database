/**
 * Manages the set of deserializers used for serialized state.
 *
 * A deserializer is any object that has a `__typeName` attribute and a `deserialize` function. A
 * common approach is to register a constructor as the deserializer for its instances by adding a
 * `deserialize` class method. When your deserialize method is called it will be passed the
 * serialized state as the first argument and the {HeroEnvironment} object as the second argument.
 */
export default class DeserializerManager {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
    this.deserializers = {}
  }

  add (...deserializers) {
    this.validate(...deserializers)

    for (let deserializer of deserializers) {
      this.deserializers[deserializer['__typeName']] = deserializer
    }
  }

  deserialize (state) {
    if (this.deserializers[state['__typeName']]) {
      return this.deserializers[state['__typeName']].deserialize(state, this.heroEnv)
    } else {
      return state
    }
  }

  get (name) {
    return this.deserializers[name]
  }

  getCount () {
    return Object.keys(this.deserializers).length
  }

  validate (...deserializers) {
    for (let deserializer of deserializers) {
      if (!(deserializer['__typeName'] && deserializer.deserialize)) {
        throw new Error(`${deserializer} is not a deserializer`)
      }
    }
  }
}
