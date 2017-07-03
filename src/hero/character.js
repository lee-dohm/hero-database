import CampaignInfoBlock from './campaign-info-block'
import CharacteristicsBlock from './characteristics-block'
import Model from './model'

/**
 * Represents a HERO System character.
 */
export default class Character extends Model {
  /**
   * Deserializes the character.
   *
   * @param {Object} state Serialized character information
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {Character} Deserialized character
   */
  static deserialize (state, heroEnv) {
    return new Character(state, heroEnv)
  }

  /**
   * Creates a default character.
   *
   * @param {Object} [state] Initial property values
   * @param {HeroEnvironment} [heroEnv=hero] Application environment
   */
  constructor (state, heroEnv = hero) {
    super(heroEnv)

    this.edition = state.edition || '6E'
    this.name = state.name || 'Unnamed Character'
    this.campaignInfo = CampaignInfoBlock.deserialize(state.campaignInfo, this.heroEnv) || new CampaignInfoBlock({}, this.heroEnv)
    this.characteristics = CharacteristicsBlock.deserialize(state.characteristics, this.heroEnv) || new CharacteristicsBlock({}, this.heroEnv)
    this.characteristicInfo = this.heroEnv.getData('characteristics')
  }

  /**
   * Serialize the character for storage in the database.
   *
   * @return {Object} Serialized character info
   */
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
