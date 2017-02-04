import {Emitter} from 'event-kit'
import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv
  }

  onDidLoadUI (callback) {
    this.emitter.on('did-load-ui', callback)
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

    await this.workspaceView.update({heroEnv: this.heroEnv})

    this.emitter.emit('did-load-ui')
  }

  async detachViews () {
    this.workspaceView.destroy()
  }
}
