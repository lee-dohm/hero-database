/** @jsx etch.dom */

import etch from 'etch'

export default class PanelContainerView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return <div className='panel-container-view'></div>
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
