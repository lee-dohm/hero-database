/** @jsx etch.dom */

import etch from 'etch'

import CharacteristicsListView from './characteristics-list-view'
import GroupView from './group-view'

/**
 * Renders the character editor view.
 */
export default class CharacterEditorView {
  /**
   * Builds the character editor view.
   *
   * @param {Object} props Properties for the character editor
   * @param {Record} props.record Character record to edit
   * @param {HeroEnvironment} props.heroEnv Application environment
   */
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  /**
   * Renders the character editor view.
   */
  render () {
    const record = this.props.record

    return (
      <div className='character-editor-view'>
        <GroupView label='Character Info'>
          <div>Name</div>
          <input type='text' value={record.name} />
        </GroupView>
        <CharacteristicsListView characteristics={record.data.characteristics} info={this.getInfo()}/>
      </div>
    )
  }

  /**
   * Redraws the character editor view.
   *
   * @param {Object} props Properties for the character editor
   * @param {Record} props.record Character record to edit
   * @param {HeroEnvironment} props.heroEnv Application environment
   */
  update (props) {
    this.props = props

    return etch.update(this)
  }

  /**
   * Destroys the character editor view.
   */
  destroy () {
    etch.destroy(this)
  }

  getInfo () {
    return this.props.heroEnv.getData('characteristics')
  }
}
