/** @jsx etch.dom */

import etch from 'etch'

export default class RecordEditorView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <div class='record-editor-view'>
        {this.renderRecord()}
      </div>
    )
  }

  renderRecord () {
    if (this.props.record) {
      return <input type='text' value={this.props.record.name} />
    }
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
