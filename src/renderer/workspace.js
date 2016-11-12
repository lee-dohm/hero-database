import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (database, heroEnv) {
    this.heroEnv = heroEnv

    this.database = database
  }

  attachViews () {
    this.database.getItems().then((items) => {
      this.workspaceView = new WorkspaceView({items: items})
      document.body.appendChild(this.workspaceView.element)
    })
  }
}
