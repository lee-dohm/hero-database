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
    console.log('Panel.hide start')

    let wasVisible = this.visible
    this.visible = false

    if (wasVisible) {
      console.log(`Emit did-change-visible: ${this.visible}`)
      this.emitter.emit('did-change-visible', this.visible)
    }

    console.log('Panel.hide end')
  }

  show () {
    let wasVisible = this.visible
    this.visible = true

    if (!wasVisible) {
      this.emitter.emit('did-change-visible', this.visible)
    }
  }
}
