import InvalidRecordError from './invalid-record-error'

const promisify = require('promisify-node')
const fs = promisify('fs')

/**
 * Represents a record in the database.
 */
export default class Record {
  static async load (filePath) {
    if (!filePath) {
      throw new Error('File path cannot be undefined')
    }

    return new Record(filePath, JSON.parse(await fs.readFile(filePath)))
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
