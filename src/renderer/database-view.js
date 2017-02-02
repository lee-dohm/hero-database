/** @jsx etch.dom */

import etch from 'etch'

import CharacterEntryView from './character-entry-view'

/**
 * Displays the contents of the database.
 */
export default class DatabaseView {
  constructor (props, children) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <div className='database-view'>
        <div className='title'>
          Records
        </div>
        <div className='records list'>
        </div>
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
