/** @jsx etch.dom */

import etch from 'etch'

export default class CharacterFileView {
  constructor ({file, name}) {
    this.file = file
    this.name = name

    etch.initialize(this)
  }

  render () {
    return (
      <div className='character-file-view'>{this.name}</div>
    )
  }

  update ({file, name}) {
    this.file = file
    this.name = name

    return etch.update(this)
  }
}
