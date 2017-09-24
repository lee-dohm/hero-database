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
   * @param {Object} props.info Characteristic information
   * @param {String} props.name Name of the characteristic
   * @param {String} props.value Value of the characteristic
   */
  constructor ({info, name, value}) {
    this.info = info
    this.name = name
    this.value = value

    etch.initialize(this)
  }

  /**
   * Renders the view.
   */
  render () {
    return (
      <div className='characteristic-view row'>
        <div className='col-3'>{this.info.abbrev}</div>
        <div className='col-3'>{this.value}</div>
        <div className='col-1'>x</div>
        <div className='col-1'>{this.info.cost.pointsPer / this.info.cost.amount}</div>
        <div className='col-1'>=</div>
        <div className='col-3'>Cost</div>
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
  update ({info, name, value}) {
    this.info = info
    this.name = name
    this.value = value

    return etch.update(this)
  }

  /**
   * Destroys the view.
   */
  destroy () {
    etch.destroy(this)
  }
}
