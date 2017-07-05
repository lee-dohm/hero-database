import Model from './model'

export default class PowersBlock extends Model {
  static deserialize (state, heroEnv) {
    return new PowersBlock(state, heroEnv)
  }
}
