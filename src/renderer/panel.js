import {Emitter} from 'event-kit'

export default class Panel {
  /**
   * Section: Construction and Destruction
   */

  constructor ({view, visible}) {
    this.emitter = new Emitter()

    if (view) {
      this.view = view
    }

    if (visible) {
      this.visible = visible
    } else {
      this.visible = true
    }
  }

  destroy () {
    this.hide()
    this.emitter.emit('did-destroy', this)
    this.emitter.dispose()
  }

  /**
   * Section: Event Subscription
   */

  onDidChangeVisible (callback) {
    this.emitter.on('did-change-visible', callback)
  }

  onDidDestroy (callback) {
    this.emitter.on('did-destroy', callback)
  }

  /**
   * Section: Panel Details
   */

  getView () {
    return this.view.render()
  }

  hide () {
    let wasVisible = this.visible
    this.visible = false

    if (wasVisible) {
      this.emitter.emit('did-change-visible', this.visible)
    }
  }

  show () {
    let wasVisible = this.visible
    this.visible = true

    if (!wasVisible) {
      this.emitter.emit('did-change-visible', this.visible)
    }
  }
}
