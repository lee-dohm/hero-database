/** @jsx etch.dom */

import etch from 'etch'

import ButtonView from './button-view'
import NewRecordDialogView from './new-record-dialog-view'
import RecordListItemView from './record-list-item-view'

/**
 * Displays the contents of the database.
 */
export default class DatabaseView {
  constructor (props, children) {
    this.props = props
    this.records = []

    etch.initialize(this)
  }

  render () {
    const {heroEnv} = this.props

    return (
      <div className='database-view'>
        <ul className="records list">
          {
            this.records.map((record) => {
              return (
                <RecordListItemView
                  heroEnv={heroEnv}
                  parent={this}
                  record={record}
                  selected={this.selected === record}
                  />
              )
            })
          }
        </ul>
        <ButtonView label='New Record' onclick={this.onNewRecordClick.bind(this)} />
      </div>
    )
  }

  async update (props) {
    this.props = props
    this.records = await this.props.database.loadAllRecords()

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  async onNewRecordClick (e) {
    const {heroEnv} = this.props

    heroEnv.workspace.addModalPanel({childView: NewRecordDialogView})
  }

  async select (record) {
    this.selected = record

    return etch.update(this)
  }
}
