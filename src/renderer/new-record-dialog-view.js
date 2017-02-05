/** @jsx etch.dom */

import etch from 'etch'

import ButtonView from './button-view'

export default class NewRecordDialogView {
  constructor (props, children) {
    this.props = props
    this.children = children

    etch.initialize(this)
  }

  render () {
    return (
      <div className='new-record-dialog-view dialog'>
        <input type='text' placeholder="Character's name" />
        <select>
          <option value='character'>Character</option>
        </select>
        <ButtonView label='Ok' />
      </div>
    )
  }

  update (props, children) {
    this.props = props
    this.children = children

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
