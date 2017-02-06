/** @jsx etch.dom */

import etch from 'etch'
import {CompositeDisposable} from 'event-kit'

import ButtonView from './button-view'

export default class NewRecordDialogView {
  constructor (props) {
    this.subscriptions = new CompositeDisposable()
    this.props = props

    this.subscriptions.add(this.props.panel.onDidChangeVisible(this.handleOnDidChangeVisible.bind(this)))

    etch.initialize(this)
  }

  async handleOnDidChangeVisible (visible) {
    this.hidden = !visible

    return etch.update(this)
  }

  render () {
    return (
      <div className={this.getClassName()}>
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

  getClassName () {
    let className = 'new-record-dialog-view dialog'

    if (this.hidden) {
      className += ' hidden'
    }

    return className
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    this.subscriptions.dispose()

    etch.destroy(this)
  }

  onClickCancel (e) {
    this.props.panel.hide()
  }

  onClickOk (e) {
    this.props.panel.hide()
  }
}
