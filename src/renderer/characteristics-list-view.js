/** @jsx etch.dom */

import etch from 'etch'

import CharacteristicView from './characteristic-view'
import GroupView from './group-view'

/**
 * Displays the characteristics list.
 */
export default class CharacteristicsListView {
  /**
   * Builds the characteristics list.
   *
   * @param {Object} props Properties for the view
   * @param {CharacteristicsBlock} props.characteristics Characteristics values
   * @param {Object} props.info Characteristics information table
   */
  constructor (props) {
    this.updateProps(props)

    etch.initialize(this)
  }

  /**
   * Renders the characteristics list.
   */
  render () {
    return (
      <div className='characteristics-list-view'>
        <GroupView label='Characteristics'>
          {this.renderCharacteristic('strength')}
          {this.renderCharacteristic('dexterity')}
          {this.renderCharacteristic('constitution')}
          {this.renderCharacteristic('intelligence')}
          {this.renderCharacteristic('ego')}
          {this.renderCharacteristic('presence')}
          {this.renderCharacteristic('offensiveCombatValue')}
          {this.renderCharacteristic('defensiveCombatValue')}
          {this.renderCharacteristic('offensiveMentalCombatValue')}
          {this.renderCharacteristic('defensiveMentalCombatValue')}
          {this.renderCharacteristic('speed')}
          {this.renderCharacteristic('physicalDefense')}
          {this.renderCharacteristic('energyDefense')}
          {this.renderCharacteristic('recovery')}
          {this.renderCharacteristic('endurance')}
          {this.renderCharacteristic('body')}
          {this.renderCharacteristic('stun')}
        </GroupView>
      </div>
    )
  }

  /**
   * Redraws the characteristics list with updated information.
   *
   * @param {Object} props Properties for the characteristics list
   * @param {CharacteristicsBlock} props.characteristics Characteristics values
   * @param {Object} props.info Characteristics information table
   */
  update (props) {
    this.updateProps(props)

    return etch.update(this)
  }

  /**
   * Destroys the characteristics list.
   */
  destroy () {
    etch.destroy(this)
  }

  renderCharacteristic (name) {
    return (
      <CharacteristicView
        name={this.info[name].abbrev}
        value={this.characteristics[name]}
        />
    )
  }

  updateProps (props) {
    const {characteristics, info} = props
    this.props = props
    this.characteristics = characteristics
    this.info = info
  }
}
