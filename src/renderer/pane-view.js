/** @jsx etch.dom */

import etch from 'etch'

export default class PaneView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return <div id='pane-view'></div>
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
