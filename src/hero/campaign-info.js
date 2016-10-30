import Block from './block'

/**
 * A block that represents information on the campaign to which the character belongs.
 */
export default class CampaignInfo extends Block {
  constructor () {
    super()

    this.name = ''
    this.genre = ''
    this.gameMaster = ''
  }
}
