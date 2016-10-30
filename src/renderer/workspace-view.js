/** @babel */
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
      <div className='workspace-view'>
        <DatabaseView database={this.props.database} />
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
