import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
  }

  /**
   * Reloads the UI.
   */
  async reloadUI () {
    await this.detachViews()
    await this.attachViews()
  }

  async attachViews () {
    this.workspaceView = new WorkspaceView({heroEnv: this.heroEnv})
    document.body.appendChild(this.workspaceView.element)

    return this.workspaceView.update({heroEnv: this.heroEnv})
  }

  async detachViews () {
    this.workspaceView.destroy()
  }
}
