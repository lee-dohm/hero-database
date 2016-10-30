/** @jsx etch.dom */

import etch from 'etch'

/**
 * Displays a Character entry in the {DatabaseView}.
 */
export default class CharacterEntryView {
  constructor ({file, name}) {
    this.file = file
    this.name = name

    etch.initialize(this)
  }

  render () {
    return (
      <div className='character-entry-view'>{this.name}</div>
    )
  }

  update ({file, name}) {
    this.file = file
    this.name = name

    return etch.update(this)
  }
}
