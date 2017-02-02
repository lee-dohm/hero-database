/** @jsx etch.dom */

import etch from 'etch'

export default class RecordView {
  constructor ({record}, children) {
    this.record = record

    etch.initialize(this)
  }

  render () {
    return <div className="record">{this.record.name}</div>
  }

  update ({record}) {
    this.record = record

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
