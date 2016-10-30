export default class DeserializationException {
  constructor (message, obj, data) {
    this.message = message
    this.obj = obj
    this.data = data
  }
}
