/** @jsx etch.dom */

import etch from 'etch'

import ButtonView from './button-view'
import Character from '../hero/character'

export default class NewRecordDialogView {
  constructor (props) {
    this.updateProps(props)

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
    this.updateProps(props)

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  onClickCancel (e) {
    this.panel.destroy()
  }

  onClickOk (e) {
    this.panel.hide()

    const character = new Character({name: this.refs.name.value}, this.heroEnv)
    this.heroEnv.database.createRecord(character)

    this.panel.destroy()
  }

  updateProps (props) {
    const {panel, heroEnv} = props
    this.props = props
    this.panel = panel
    this.heroEnv = heroEnv
  }
}
