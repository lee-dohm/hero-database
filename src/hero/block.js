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
   */
  deserialize (json) {
    let data = JSON.parse(json)

    if (data.type !== this.constructor.name) {
      throw new DeserializationException(
        `Block type doesn't match the class type: ${data.type} !== ${this.constructor.name}`,
        this,
        data)
    }

    Object.assign(this, data)
  }

  /**
   * Serialize the data and return the serialized format.
   */
  serialize () {
    return JSON.stringify(this)
  }
}
