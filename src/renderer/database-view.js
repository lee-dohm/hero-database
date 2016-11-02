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
        <header>
          <span className='title'>Characters</span>
        </header>
        {
          this.props.database.items.map(({file, name}) => {
            return <CharacterEntryView file={file} name={name} />
          })
        }
      </div>
    )
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this).then(() => {
      this.disposable.dispose()
    })
  }
}
