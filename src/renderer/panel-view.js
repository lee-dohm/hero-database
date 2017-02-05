/** @jsx etch.dom */

import etch from 'etch'

export default class PanelView {
  constructor ({childView, panel}) {
    this.panel = panel

    const View = childView
    this.childView = (
      <View panel={this.panel} />
    )

    etch.initialize(this)
  }

  render () {
    return (
      <div className='panel-view'>
        {this.childView}
      </div>
    )
  }

  update (props) {
    this.props = Object.assign({}, this, props)

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
