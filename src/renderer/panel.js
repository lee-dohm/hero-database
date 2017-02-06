import {Emitter} from 'event-kit'

export default class Panel {
  /**
   * Section: Construction and Destruction
   */

  constructor ({childView, visible}) {
    this.emitter = new Emitter()

    this.childView = childView

    if (visible) {
      this.visible = visible
    } else {
      this.visible = true
    }
  }

  destroy () {
    this.emitter.emit('did-destroy', this)
    this.emitter.dispose()
  }

  /**
   * Section: Event Subscription
   */

  onDidChangeVisible (callback) {
    return this.emitter.on('did-change-visible', callback)
  }

  onDidDestroy (callback) {
    return this.emitter.on('did-destroy', callback)
  }

  /**
   * Section: Panel Details
   */

  getChildView () {
    return this.childView
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
