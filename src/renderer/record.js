import InvalidRecordError from './invalid-record-error'

const promisify = require('promisify-node')
const fs = promisify('fs')

/**
 * Represents a record in the database.
 */
export default class Record {
  static async load (filePath, heroEnv) {
    if (!filePath) {
      throw new Error('File path cannot be undefined')
    }

    let state = JSON.parse(await fs.readFile(filePath))
    if (heroEnv && heroEnv.deserializers) {
      state = heroEnv.deserializers.deserialize(state)
    }

    return new Record(filePath, state)
  }

  constructor (filePath, data) {
    this.filePath = filePath
    this.data = data

    if (!this.data.name) {
      throw new InvalidRecordError('Does not contain the name attribute', this.filePath)
    }

    this.name = this.data.name
  }
}
