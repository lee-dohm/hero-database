/** @jsx etch.dom */

import etch from 'etch'

/**
 * Displays a grouped set of elements with a border and an optional label for the group.
 */
export default class GroupView {
  constructor ({label}, children) {
    this.label = label
    this.children = children

    etch.initialize(this)
  }

  render () {
    return (
      <div className='group-view'>
        <label>{this.label}</label>
        {this.children}
      </div>
    )
  }

  update ({label}, children) {
    this.label = label
    this.children = children

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
