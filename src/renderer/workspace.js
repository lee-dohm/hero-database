import {Emitter} from 'event-kit'

import Panel from './panel'
import PanelContainer from './panel-container'
import WorkspaceView from './workspace-view'

/**
 * Represents the application's workspace.
 *
 * The workspace consists mostly of the central editing {@link Pane}. A modal {@link Panel} can be
 * attached also for dialog boxes that need to be displayed.
 */
export default class Workspace {
  constructor (heroEnv) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv

    this.panelContainer = new PanelContainer({location: 'modal'})
  }

  /**
   * Raised when a record is opened for editing.
   *
   * @event Workspace#onDidOpen
   * @see Workspace~onDidOpenCallback
   */

  /**
   * Callback function for the {@link Workspace#event:onDidOpen} event.
   *
   * @callback Workspace~onDidOpenCallback
   * @param {Editor} editor Editor that was opened
   */

  /**
   * Subscribes to the {@link Workspace#event:onDidOpen} event.
   *
   * @param {Workspace~onDidOpenCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidOpen (callback) {
    this.emitter.on('did-open', callback)
  }

  /**
   * Raised when the UI is loaded.
   *
   * @event Workspace#onDidLoadUI
   * @see Workspace~onDidLoadUI
   */

  /**
   * Callback function for the {@link Workspace#event:onDidLoadUI} event.
   *
   * @callback Workspace~onDidLoadUICallback
   */

  /**
   * Subscribes to the {@link Workspace#event:onDidLoadUI} event.
   *
   * @param {Workspace~onDidLoadUICallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidLoadUI (callback) {
    this.emitter.on('did-load-ui', callback)
  }

  /**
   * Opens a record for editing.
   *
   * @param {Record} record Record to edit
   */
  async open (record) {
    const editor = this.heroEnv.editors.buildEditor(record)
    this.heroEnv.pane.setEditor(editor)

    this.emitter.emit('did-open', editor)
  }

   /**
    * Adds a modal panel to the workspace.
    *
    * * `props`
    *   * `.childView` An Etch view to display within the panel.
    *   * `.visible` {Boolean} indicating whether the panel is visible to start. Defaults to `true`.
    */

  /**
   * Adds a modal panel to the workspace.
   *
   * @param {Object} props Properties for the panel
   * @param {View} props.childView View to display within the panel
   * @param {Boolean} props.visible=true Flag indicating whether the panel is visible to start
   * @returns {Panel} Panel that was displayed
   */
  addModalPanel (props) {
    let panelProps = Object.assign({visible: true}, props, {heroEnv: this.heroEnv})

    return this.panelContainer.addPanel(new Panel(panelProps))
  }

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
