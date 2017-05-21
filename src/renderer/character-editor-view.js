/** @jsx etch.dom */

import etch from 'etch'

export default class CharacterEditorView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    const record = this.props.record

    return (
      <div class='character-editor-view'>
        <div>Character Name</div>
        <input type='text' value={record.name} />
      </div>
    )
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
