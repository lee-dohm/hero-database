import DeserializationException from './deserialization-exception'

/**
 * Represents a block of information that can be serialized and deserialized.
 */
export default class Block {
  constructor () {
    this.type = this.constructor.name
  }

  /**
   * Deserialize the data from the supplied JSON.
   *
   * * `json` - {String} containing the serialized form of the object to copy
   */
  deserialize (json) {
    let data = JSON.parse(json)

    if (data.type !== this.constructor.name) {
      throw new DeserializationException(
        `Block type doesn't match the class type: ${data.type} !== ${this.constructor.name}`,
        this,
        data)
    }

    for (let key in this) {
      delete this[key]
    }

    Object.assign(this, data)
  }

  /**
   * Serialize the data and return the serialized format.
   *
   * Returns a {String} containing the serialized form of this object.
   */
  serialize () {
    return JSON.stringify(this)
  }
}
