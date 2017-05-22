/** @jsx etch.dom */

import etch from 'etch'

import CharacteristicView from './characteristic-view'

export default class CharacteristicsListView {
  constructor (props) {
    this.updateProps(props)

    etch.initialize(this)
  }

  render () {
    return (
      <div className='characteristics-list-view'>
        <div>Characteristics</div>
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
      </div>
    )
  }

  update (props) {
    this.updateProps(props)

    return etch.update(this)
  }

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
