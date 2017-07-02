import Model from './model'

/**
 * A block that represents information on the campaign to which the character belongs.
 */
export default class CampaignInfoBlock extends Model {
  /**
   * Deserializes the info block.
   *
   * @param {Object} state Serialized info block
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {CampaignInfoBlock} Deserialized info block
   */
  static deserialize (state, heroEnv) {
    return new CampaignInfoBlock(state, heroEnv)
  }

  /**
   * Constructs a new {CampaignInfoBlock}.
   *
   * @param {Object} state Initial values for properties
   * @param {HeroEnvironment} heroEnv Application environment
   */
  constructor (state, heroEnv) {
    super(heroEnv)

    Object.assign(this, this.getDefaultCampaignInfo(), state, {heroEnv: this.heroEnv})
  }

  /**
   * Gets the default campaign information.
   *
   * @private
   * @return {Object} Default campaign information
   */
  getDefaultCampaignInfo () {
    return {
      name: '',
      genre: '',
      gameMaster: ''
    }
  }

  /**
   * Serializes the campaign information.
   *
   * @return {Object} Serialized information
   */
  serialize () {
    return Object.assign({}, this, {heroEnv: undefined})
  }
}
