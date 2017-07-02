import {Emitter} from 'event-kit'

/**
 * Represents a panel attached to the {@link Workspace}.
 */
export default class Panel {
  /**
   * Constructs the panel.
   *
   * @param {Object} options
   * @param {View} options.childView View to be displayed within the panel
   * @param {HeroEnvironment} options.heroEnv Application environment
   * @param {Boolean} options.visible Flag indicating whether the panel should be visible
   */
  constructor ({childView, heroEnv, visible}) {
    this.emitter = new Emitter()

    this.childView = childView
    this.heroEnv = heroEnv

    if (visible) {
      this.visible = visible
    } else {
      this.visible = true
    }
  }

  /**
   * Destroys the panel.
   */
  destroy () {
    this.emitter.emit('did-destroy', this)
    this.emitter.dispose()
  }

  /**
   * Raised when the panel changes between visible and hidden.
   *
   * @event Panel#onDidChangeVisible
   * @see Panel~onDidChangeVisibleCallback
   */

  /**
   * Callback function for the {@link Panel#event:onDidChangeVisible} event.
   *
   * @callback Panel~onDidChangeVisibleCallback
   * @param {Boolean} visible Flag indicating whether the panel is visible after the change
   */

  /**
   * Subscribes to the {@link Panel#event:onDidChangeVisible} event.
   *
   * @param {Panel~onDidChangeVisibleCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidChangeVisible (callback) {
    return this.emitter.on('did-change-visible', callback)
  }

  /**
   * Raised when the panel is destroyed.
   *
   * @event Panel#onDidDestroy
   * @see Panel~onDidDestroyCallback
   */

  /**
   * Callback function for the {@link Panel#event:onDidDestroy} event.
   *
   * @callback Panel~onDidDestroyCallback
   */

  /**
   * Subscribes to the {@link Panel#event:onDidDestroy} event.
   *
   * @param {Panel~onDidDestroyCallback} callback Function to call when the event is raised
   * @return {Disposable} Object on which `.dispose()` can be called to unsubscribe
   */
  onDidDestroy (callback) {
    return this.emitter.on('did-destroy', callback)
  }

  /**
   * Gets the view being displayed in the panel.
   *
   * @return {View} View being displayed in the panel
   */
  getChildView () {
    return this.childView
  }

  /**
   * Hides the panel.
   */
  hide () {
    let wasVisible = this.visible
    this.visible = false

    if (wasVisible) {
      this.emitter.emit('did-change-visible', this.visible)
    }
  }

  /**
   * Shows the panel.
   */
  show () {
    let wasVisible = this.visible
    this.visible = true

    if (!wasVisible) {
      this.emitter.emit('did-change-visible', this.visible)
    }
  }
}
