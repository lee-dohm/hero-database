/** @jsx etch.dom */

import etch from 'etch'

export default class ButtonView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <button className='btn' type='button' onclick={this.props.onclick}>{this.props.label}</button>
    )
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
