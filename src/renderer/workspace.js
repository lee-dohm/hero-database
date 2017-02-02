import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
  }

  async attachViews () {
    this.workspaceView = new WorkspaceView({heroEnv: this.heroEnv})
    document.body.appendChild(this.workspaceView.element)

    return this.workspaceView.update({heroEnv: this.heroEnv})
  }
}
