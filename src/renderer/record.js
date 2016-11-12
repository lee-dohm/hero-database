import fs from 'fs'

/**
 * Represents a record in the database.
 */
export default class Record {
  constructor (filePath) {
    if (!filePath) {
      throw new Error('File path cannot be undefined')
    }

    this.filePath = filePath
    this.data = JSON.parse(fs.readFileSync(this.filePath))

    if (!this.data.name) {
      throw new Error(`Invalid record at ${this.filePath}: does not contain a name attribute`)
    }

    this.name = this.data.name
  }
}
