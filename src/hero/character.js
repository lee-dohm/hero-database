import CampaignInfoBlock from './campaign-info-block'
import CharacteristicsBlock from './characteristics-block'

/**
 * Represents a HERO System character.
 */
export default class Character {
  /**
   * Creates a default character.
   */
  constructor (name = 'Unnamed Character', heroEnv = hero) {
    this.heroEnv = heroEnv

    this.edition = '6E'
    this.name = name
    this.campaignInfo = new CampaignInfoBlock()
    this.characteristics = new CharacteristicsBlock({}, this.heroEnv)
  }
}
