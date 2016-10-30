/** @babel */
/** @jsx etch.dom */

import etch from 'etch'

export default class WorkspaceView {
  constructor (props, children) {
    this.props = props
    this.children = children

    etch.initialize(this)
  }

  render () {
    return (
      <div className='workspace-view'>
        <h1>Workspace View</h1>
        {this.children}
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
