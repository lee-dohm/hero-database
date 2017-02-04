import Model from './model'

/**
 * A block that represents information on the campaign to which the character belongs.
 */
export default class CampaignInfoBlock extends Model {
  static deserialize (state, heroEnv) {
    return new CampaignInfoBlock(state, heroEnv)
  }

  constructor (state, heroEnv) {
    super(heroEnv)

    Object.assign(this, this.getDefaultCampaignInfo(), state, {heroEnv: this.heroEnv})
  }

  getDefaultCampaignInfo () {
    return {
      name: '',
      genre: '',
      gameMaster: ''
    }
  }

  serialize () {
    return Object.assign({}, this, {heroEnv: undefined})
  }
}
