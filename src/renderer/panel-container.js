import {CompositeDisposable, Emitter} from 'event-kit'

export default class PanelContainer {
  constructor ({location} = {}) {
    this.emitter = new Emitter()
    this.location = location
    this.subscriptions = new CompositeDisposable()
    this.panels = []
  }

  destroy () {
    for (let panel of this.getPanels()) {
      panel.destroy()
    }

    this.subscriptions.dispose()
    this.emitter.emit('did-destroy', this)
    this.emitter.dispose()
  }

  /**
   * Section: Event Subscription
   */

  onDidAddPanel (callback) {
    this.emitter.on('did-add-panel', callback)
  }

  onDidRemovePanel (callback) {
    this.emitter.on('did-remove-panel', callback)
  }

  onDidDestroy (callback) {
    this.emitter.on('did-destroy')
  }

  /**
   * Section: Panel Container Details
   */

  getLocation () {
    return this.location
  }

  isModal () {
    return this.location === 'modal'
  }

  /**
   * Section: Panels
   */

  getPanels () {
    return this.panels
  }

  addPanel (panel) {
    this.subscriptions.add(panel.onDidDestroy(this.panelDestroyed.bind(this)))

    this.panels.push(panel)
    this.emitter.emit('did-add-panel', panel)

    return panel
  }

  panelDestroyed (panel) {
    let index = this.panels.indexOf(panel)

    if (index > -1) {
      this.panels.splice(index, 1)
      this.emitter.emit('did-remove-panel', {panel, index})
    }
  }
}
