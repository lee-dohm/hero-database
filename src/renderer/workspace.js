import {Emitter} from 'event-kit'

import Panel from './panel'
import PanelContainer from './panel-container'
import WorkspaceView from './workspace-view'

/**
 * Represents the workspace.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv

    this.panelContainer = new PanelContainer({location: 'modal'})
  }

  /**
   * Section: Event Subscription
   */

  /**
   * Called when a record has been opened for editing.
   *
   * * `editor` Editor for the record.
   */
  onDidOpen (callback) {
    this.emitter.on('did-open', callback)
  }

  /**
   * Called when the UI has been loaded.
   */
  onDidLoadUI (callback) {
    this.emitter.on('did-load-ui', callback)
  }

  /**
   * Section: Opening
   */

  /**
   * Opens a record for editing.
   */
  async open (record) {
    const editor = this.heroEnv.editors.buildEditor(record)
    this.heroEnv.pane.setEditor(editor)

    this.emitter.emit('did-open', editor)
  }

  /**
   * Section: Panels
   */

   /**
    * Adds a modal panel to the workspace.
    *
    * * `options`
    *   * `.view` An Etch view to display within the panel.
    *   * `.visible` {Boolean} indicating whether the panel is visible to start. Defaults to `true`.
    */
  addModalPanel ({view, visible}) {
    return this.panelContainer.addPanel(new Panel({childView: view, visible: visible}))
  }

  /**
   * Section: Debugging
   */

  /**
   * Reloads the UI.
   */
  async reloadUI () {
    await this.detachViews()
    await this.attachViews()
  }

  async attachViews () {
    this.workspaceView = new WorkspaceView({heroEnv: this.heroEnv, panelContainer: this.panelContainer})
    document.body.appendChild(this.workspaceView.element)

    await this.workspaceView.update({heroEnv: this.heroEnv, panelContainer: this.panelContainer})

    this.emitter.emit('did-load-ui')
  }

  async detachViews () {
    this.workspaceView.destroy()
  }
}
