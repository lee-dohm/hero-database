/** @jsx etch.dom */

import etch from 'etch'

import ButtonView from './button-view'

export default class NewRecordDialogView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <div className='new-record-dialog-view dialog'>
        <div>
          <input type='text' placeholder="Character's name" />
        </div>
        <div>
          <select>
            <option value='character'>Character</option>
          </select>
        </div>
        <div>
          <ButtonView label='Cancel' onclick={this.onClickCancel.bind(this)} />
          <ButtonView label='Ok' onclick={this.onClickOk.bind(this)} />
        </div>
      </div>
    )
  }

  update (props, children) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  onClickCancel (e) {
    e.preventDefault()

    this.props.panel.hide()
  }

  onClickOk (e) {
    e.preventDefault()

    this.props.panel.hide()
  }
}
