import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (database, heroEnv) {
    this.heroEnv = heroEnv

    this.database = database
  }

  async attachViews () {
    this.workspaceView = new WorkspaceView()
    document.body.appendChild(this.workspaceView.element)

    return this.workspaceView.update()
  }
}
