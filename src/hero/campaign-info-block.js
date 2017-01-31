/**
 * A block that represents information on the campaign to which the character belongs.
 */
export default class CampaignInfoBlock {
  static deserialize (state) {
    return new CampaignInfoBlock(state)
  }

  constructor (state) {
    if (state) {
      Object.assign(this, state)
    } else {
      this.__typeName = this.constructor.name
      this.name = ''
      this.genre = ''
      this.gameMaster = ''
    }
  }

  serialize () {
    return Object.assign({}, this)
  }
}
