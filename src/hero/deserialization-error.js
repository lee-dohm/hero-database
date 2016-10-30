export default class DeserializationError {
  constructor (message, obj, data) {
    this.message = message
    this.obj = obj
    this.data = data
  }
}
