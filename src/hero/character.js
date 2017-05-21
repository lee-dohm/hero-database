import CampaignInfoBlock from './campaign-info-block'
import CharacteristicsBlock from './characteristics-block'
import Model from './model'

/**
 * Represents a HERO System character.
 */
export default class Character extends Model {
  static deserialize (state, heroEnv) {
    return new Character(state, heroEnv)
  }

  /**
   * Creates a default character.
   */
  constructor (state, heroEnv = hero) {
    super(heroEnv)

    this.edition = state.edition || '6E'
    this.name = state.name || 'Unnamed Character'
    this.campaignInfo = CampaignInfoBlock.deserialize(state.campaignInfo, this.heroEnv) || new CampaignInfoBlock({}, this.heroEnv)
    this.characteristics = CharacteristicsBlock.deserialize(state.characteristics, this.heroEnv) || new CharacteristicsBlock({}, this.heroEnv)
  }

  serialize () {
    return {
      '__typeName': this.constructor.name,
      edition: this.edition,
      name: this.name,
      campaignInfo: this.campaignInfo.serialize(),
      characteristics: this.characteristics.serialize()
    }
  }
}
