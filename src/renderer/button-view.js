/** @jsx etch.dom */

import etch from 'etch'

/**
 * Renders a standard button.
 */
export default class ButtonView {
  /**
   * Buids the button view.
   *
   * @param {Object} props Properties for the button
   * @param {String} props.label Label text
   * @param {Function} props.onclick Function to call when clicked
   */
  constructor ({label, onclick}) {
    this.label = label
    this.onclick = onclick

    etch.initialize(this)
  }

  /**
   * Renders the button.
   */
  render () {
    return (
      <button className='btn' type='button' onclick={this.onclick}>{this.label}</button>
    )
  }

  /**
   * Redraws the button.
   *
   * @param {Object} props Properties for the button
   * @param {String} props.label Label text
   * @param {Function} props.onclick Function to call when clicked
   */
  update ({label, onclick}) {
    this.label = label
    this.onclick = onclick

    return etch.update(this)
  }

  /**
   * Destroys the button.
   */
  destroy () {
    etch.destroy(this)
  }
}
