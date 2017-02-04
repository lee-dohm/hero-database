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

    if (state.edition) {
      this.edition = state.edition
    } else {
      this.edition = '6E'
    }

    if (state.name) {
      this.name = state.name
    } else {
      this.name = 'Unnamed Character'
    }

    if (state.campaignInfo) {
      this.campaignInfo = CampaignInfoBlock.deserialize(state.campaignInfo, this.heroEnv)
    } else {
      this.campaignInfo = new CampaignInfoBlock({}, this.heroEnv)
    }

    if (state.characteristics) {
      this.characteristics = CharacteristicsBlock.deserialize(state.characteristics, this.heroEnv)
    } else {
      this.characteristics = new CharacteristicsBlock({}, this.heroEnv)
    }
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
