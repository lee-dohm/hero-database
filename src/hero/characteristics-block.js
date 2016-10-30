import Block from './block'
import Utilities from '../app/utilities'

/**
 * A block that represents information on the characteristics of the character.
 */
export default class CharacteristicsBlock extends Block {
  /**
   * Constructs a default set of characteristics.
   *
   * * `overrides` - an {Object} containing values to override from the defaults
   */
  constructor (overrides = {}) {
    super()

    this.strength = 10
    this.dexterity = 10
    this.constitution = 10
    this.intelligence = 10
    this.ego = 10
    this.presence = 10
    this.ocv = 3
    this.dcv = 3
    this.omcv = 3
    this.dmcv = 3
    this.speed = 2
    this.physicalDefense = 2
    this.energyDefense = 2
    this.recovery = 4
    this.endurance = 20
    this.body = 10
    this.stun = 20

    Object.assign(this, CharacteristicsBlock.getDefaultBaseCharacteristics(), overrides)
  }

  static getDefaultBaseCharacteristics () {
    const defaults = Utilities.getDataFile('characteristics')
    let defaultBases = {}

    for (let prop in defaults) {
      defaultBases[prop] = defaults[prop].base
    }

    return defaultBases
  }
}
