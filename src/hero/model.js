/**
 * Data and behaviors common to all data storage classes.
 */
export default class Model {
  constructor (heroEnv) {
    this.__typeName = this.constructor.name
    this.heroEnv = heroEnv
  }
}
