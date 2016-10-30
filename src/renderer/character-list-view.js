/** @jsx etch.dom */

import etch from 'etch'

import CharacterFileView from './character-file-view'

export default class CharacterListView {
  constructor (list) {
    this.updateChildren(list)

    etch.initialize(this)
  }

  render () {
    return (
      <div className='character-list-view'>
        <div className='label'>Character List</div>
        <div className='list-container'>
          {this.children}
        </div>
      </div>
    )
  }

  update (list) {
    this.updateChildren(list)

    return etch.update(this)
  }

  updateChildren (list) {
    this.list = list
    this.children = this.list.map((file) => { return new CharacterFileView(file) })
  }
}
