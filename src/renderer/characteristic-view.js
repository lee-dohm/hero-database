/** @jsx etch.dom */

import etch from 'etch'

/**
 * View for a single characteristic.
 */
export default class CharacteristicView {
  /**
   * Builds the view.
   *
   * @param {Object} props Properties for the view
   * @param {String} props.name Name of the characteristic
   * @param {String} props.value Value of the characteristic
   */
  constructor (props) {
    this.updateProps(props)

    etch.initialize(this)
  }

  /**
   * Renders the view.
   */
  render () {
    return (
      <div className='characteristic-view row'>
        <div className='label'>{this.name}</div>
        <div className='value'>{this.value}</div>
      </div>
    )
  }

  /**
   * Redraws the view with updated information.
   *
   * @param {Object} props Properties for the view
   * @param {String} props.name Name of the characteristic
   * @param {String} props.value Value of the characteristic
   */
  update (props) {
    this.updateProps(props)

    return etch.update(this)
  }

  /**
   * Destroys the view.
   */
  destroy () {
    etch.destroy(this)
  }

  updateProps (props) {
    const {name, value} = props
    this.name = name
    this.value = value
  }
}
