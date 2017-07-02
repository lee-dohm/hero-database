/**
 * Thrown when a record is invalid.
 */
export default class InvalidRecordError extends Error {
  /**
   * Constructs a new InvalidRecordError.
   *
   * @param {String} message Description of the error
   * @param {String} path On-disk path to the record
   */
  constructor (message, path) {
    super(`Invalid record at ${path}: ${message}`)
  }
}
