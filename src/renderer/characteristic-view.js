/** @jsx etch.dom */

import etch from 'etch'

export default class CharacteristicView {
  constructor (props) {
    this.updateProps(props)

    etch.initialize(this)
  }

  render () {
    return (
      <div className='characteristic-view row'>
        <div className='label'>{this.name}</div>
        <div className='value'>{this.value}</div>
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

  updateProps (props) {
    const {name, value} = props
    this.name = name
    this.value = value
  }
}
