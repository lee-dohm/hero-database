import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (database, heroEnv) {
    this.heroEnv = heroEnv

    this.database = database
    this.workspaceView = new WorkspaceView({database: this.database})
  }

  attachViews () {
    document.body.appendChild(this.workspaceView.element)
  }
}
