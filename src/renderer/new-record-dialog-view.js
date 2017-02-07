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
          <input type='text' placeholder="Character's name" ref='name' />
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

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  onClickCancel (e) {
    this.props.panel.destroy()
  }

  onClickOk (e) {
    this.props.panel.hide()

    this.props.heroEnv.database.createRecord(this.refs.name.value)

    this.props.panel.destroy()
  }
}
