import Model from './model'

export default class PerksBlock extends Model {
  static deserialize (state, heroEnv) {
    return new PerksBlock(state, heroEnv)
  }
}
