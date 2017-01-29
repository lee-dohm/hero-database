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

  async store () {
    let data = null

    if (this.data.serialize) {
      data = this.data.serialize()
    } else {
      data = this.data
    }

    return fs.writeFile(this.filePath, JSON.stringify(data, null, 2))
  }
}
