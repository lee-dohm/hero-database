import Model from './model'

export default class TalentsBlock extends Model {
  static deserialize (state, heroEnv) {
    return new TalentsBlock(state, heroEnv)
  }
}
