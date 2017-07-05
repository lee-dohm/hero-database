import Model from './model'

export default class SkillsBlock extends Model {
  static deserialize (state, heroEnv) {
    return new SkillsBlock(state, heroEnv)
  }
}
