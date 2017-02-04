/** @jsx etch.dom */

import etch from 'etch'

import DatabaseView from './database-view'
import PanelContainerView from './panel-container-view'
import PaneView from './pane-view'

export default class WorkspaceView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <div id='workspace-view'>
        <div id='sidebar'>
          <DatabaseView database={this.props.heroEnv.database} heroEnv={this.props.heroEnv} />
        </div>
        <div id='editor'>
          <PaneView heroEnv={this.props.heroEnv} pane={this.props.heroEnv.pane}/>
        </div>
        <PanelContainerView panelContainer={this.props.panelContainer} />
      </div>
    )
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  async destroy () {
    return etch.destroy(this)
  }
}
