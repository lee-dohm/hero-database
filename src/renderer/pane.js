import {Emitter} from 'event-kit'

/**
 * Represents the editor pane area of the UI.
 */
export default class Pane {
  constructor (heroEnv = hero) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv
  }

  /**
   * Called with the current active editor and whenever the active editor is changed.
   *
   * * `editor` Editor that is now active.
   */
  observeEditor (callback) {
    this.emitter.on('did-change-editor', callback)

    if (this.editor) {
      this.emitter.emit('did-change-editor', this.editor)
    }
  }

  /**
   * Sets the active editor.
   *
   * * `editor` Editor to make active.
   */
  setEditor (editor) {
    this.editor = editor

    this.emitter.emit('did-change-editor', this.editor)
  }
}
