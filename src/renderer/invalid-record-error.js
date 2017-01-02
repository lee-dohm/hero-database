export default class InvalidRecordError extends Error {
  constructor (message, path) {
    super(`Invalid record at ${path}: ${message}`)
  }
}
