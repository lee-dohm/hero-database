import CampaignInfo from './campaign-info'

/**
 * Represents a HERO System character.
 */
export default class Character {
  /**
   * Creates a default character.
   */
  constructor (name = 'Unnamed Character') {
    this.edition = '6E'
    this.name = name
    this.campaignInfo = new CampaignInfo()
  }
}
