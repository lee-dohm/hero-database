import Model from './model'

export default class ComplicationsBlock extends Model {
  static deserialize (state, heroEnv) {
    return new ComplicationsBlock(state, heroEnv)
  }
}
