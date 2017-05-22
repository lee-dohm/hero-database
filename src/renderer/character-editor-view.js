/** @jsx etch.dom */

import etch from 'etch'

import CharacteristicsListView from './characteristics-list-view'

export default class CharacterEditorView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    const record = this.props.record

    return (
      <div class='character-editor-view'>
        <div>Name</div>
        <input type='text' value={record.name} />
        <CharacteristicsListView characteristics={record.data.characteristics} info={this.getInfo()}/>
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

  getInfo () {
    return this.props.heroEnv.getData('characteristics')
  }
}
