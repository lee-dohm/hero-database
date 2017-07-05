import CampaignInfoBlock from './campaign-info-block'
import CharacteristicsBlock from './characteristics-block'
import ComplicationsBlock from './complications-block'
import Model from './model'
import PerksBlock from './perks-block'
import PowersBlock from './powers-block'
import SkillsBlock from './skills-block'
import TalentsBlock from './talents-block'

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
    this.skills = SkillsBlock.deserialize(state.skills, this.heroEnv) || new SkillsBlock({}, this.heroEnv)
    this.perks = PerksBlock.deserialize(state.perks, this.heroEnv) || new PerksBlock({}, this.heroEnv)
    this.talents = TalentsBlock.deserialize(state.talents, this.heroEnv) || new TalentsBlock({}, this.heroEnv)
    this.powers = PowersBlock.deserialize(state.powers, this.heroEnv) || new PowersBlock({}, this.heroEnv)
    this.complications = ComplicationsBlock.deserialize(state.complications, this.heroEnv) || new ComplicationsBlock({}, this.heroEnv)
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
