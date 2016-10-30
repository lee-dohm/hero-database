/**
 * Represents a block of information that can be serialized and deserialized.
 */
export default class Block {
  /**
   * Deserialize the data from the supplied JSON.
   */
  deserialize (json) {
    Object.assign(this, JSON.parse(json))
  }

  /**
   * Serialize the data and return the serialized format.
   */
  serialize () {
    return JSON.stringify(this)
  }
}
