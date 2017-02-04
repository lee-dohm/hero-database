import {Emitter} from 'event-kit'

export default class Pane {
  constructor (heroEnv = hero) {
    this.emitter = new Emitter()
    this.heroEnv = heroEnv
  }

  observeEditor (callback) {
    this.emitter.on('did-change-editor', callback)

    if (this.editor) {
      this.emitter.emit('did-change-editor', this.editor)
    }
  }

  setEditor (editor) {
    this.editor = editor

    this.emitter.emit('did-change-editor', this.editor)
  }
}
