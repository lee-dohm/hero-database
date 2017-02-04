import {Emitter} from 'event-kit'

import RecordEditor from './record-editor'
import WorkspaceView from './workspace-view'

/**
 * Represents the contents of the current workspace.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv
  }

  onDidOpen (callback) {
    this.emitter.on('did-open', callback)
  }

  onDidLoadUI (callback) {
    this.emitter.on('did-load-ui', callback)
  }

  async open (record) {
    const editor = new RecordEditor(record)
    this.heroEnv.pane.setEditor(editor)

    this.emitter.emit('did-open', editor)
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
