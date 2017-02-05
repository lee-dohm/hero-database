/** @jsx etch.dom */

import etch from 'etch'

import PanelView from './panel-view'

export default class PanelContainerView {
  constructor (props, children) {
    this.props = props
    this.children = children

    this.props.panelContainer.onDidAddPanel(this.onUpdatePanels.bind(this))
    this.props.panelContainer.onDidRemovePanel(this.onUpdatePanels.bind(this))

    etch.initialize(this)
  }

  render () {
    return (
      <div className={this.getClassName()}>
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

  onUpdatePanels () {
    const panels = this.props.panelContainer.getPanels()
    this.children = panels.map((panel) => {
      return <PanelView childView={panel.getChildView()} panel={panel} />
    })

    return etch.update(this)
  }

  getClassName () {
    let className = 'panel-container-view'

    if (this.props.panelContainer && this.props.panelContainer.isModal()) {
      className += ' modal'
    }

    return className
  }
}
