/** @jsx etch.dom */

import etch from 'etch'

import DatabaseView from './database-view'

export default class WorkspaceView {
  constructor (props, children) {
    this.props = props
    this.children = children

    etch.initialize(this)
  }

  render () {
    return (
      <div id='workspace-view'>
        <div id='sidebar'>
          <DatabaseView database={this.props.heroEnv.database} />
        </div>
        <div id='editor'>
          Test
        </div>
      </div>
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
