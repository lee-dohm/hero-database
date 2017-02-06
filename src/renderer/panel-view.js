/** @jsx etch.dom */

import etch from 'etch'
import {CompositeDisposable} from 'event-kit'

export default class PanelView {
  constructor ({childView, panel}) {
    this.subscriptions = new CompositeDisposable()

    this.panel = panel
    this.hidden = !this.panel.visible

    const View = childView
    this.childView = (
      <View panel={this.panel} />
    )

    this.addEventHandlers()

    etch.initialize(this)
  }

  render () {
    return (
      <div className={this.getClassName()}>
        {this.childView}
      </div>
    )
  }

  update (props) {
    this.props = Object.assign({}, this, props)

    return etch.update(this)
  }

  destroy () {
    this.subscriptions.dispose()

    etch.destroy(this)
  }

  addEventHandlers () {
    this.subscriptions.add(this.panel.onDidChangeVisible((visible) => {
      this.hidden = !visible

      return etch.update(this)
    }))

    this.subscriptions.add(this.panel.onDidDestroy(() => {
      this.destroy()
    }))
  }

  getClassName () {
    let className = 'panel-view'

    if (this.hidden) {
      className += ' hidden'
    }

    return className
  }
}
