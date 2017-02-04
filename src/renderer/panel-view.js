/** @jsx etch.dom */

import etch from 'etch'

export default class PanelView {
  constructor (props, children) {
    this.props = props
    this.children = children

    etch.initialize(this)
  }

  render () {
    return (
      <div className='panel-view'>
        {this.children}
      </div>
    )
  }

  update (props, children) {
    this.props = props
    this.children = children

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
