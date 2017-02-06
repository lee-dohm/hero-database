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
    const {heroEnv, panelContainer} = this.props
    const database = heroEnv.database
    const pane = heroEnv.pane

    return (
      <div id='workspace-view'>
        <div id='sidebar'>
          <DatabaseView database={database} heroEnv={heroEnv} />
        </div>
        <div id='editor'>
          <PaneView heroEnv={heroEnv} pane={pane}/>
        </div>
        <PanelContainerView heroEnv={heroEnv} panelContainer={panelContainer} />
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
