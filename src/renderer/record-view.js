/** @jsx etch.dom */

import etch from 'etch'

export default class RecordView {
  constructor ({heroEnv, record}, children) {
    this.heroEnv = heroEnv
    this.record = record

    etch.initialize(this)
  }

  onClick (e) {
    e.preventDefault()

    this.heroEnv.workspace.open(this.record)
  }

  render () {
    return <div className="record" onclick={this.onClick.bind(this)}>{this.record.name}</div>
  }

  update ({heroEnv, record}) {
    this.heroEnv = heroEnv
    this.record = record

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
