/** @jsx etch.dom */

import etch from 'etch'
import {CompositeDisposable} from 'event-kit'

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

    this.handleEvents()

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
    this.props = Object.assign({}, this.props, props)
    this.records = await this.props.database.loadAllRecords()

    return etch.update(this)
  }

  destroy () {
    this.subscriptions.dispose()

    etch.destroy(this)
  }

  async onNewRecordClick (e) {
    const {heroEnv} = this.props

    heroEnv.workspace.addModalPanel({childView: NewRecordDialogView})
  }

  handleEvents () {
    const {heroEnv} = this.props
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(heroEnv.database.onDidCreateRecord(this.handleRecordUpdates.bind(this)))
    this.subscriptions.add(heroEnv.database.onDidDeleteRecord(this.handleRecordUpdates.bind(this)))
  }

  async handleRecordUpdates () {
    this.records = await this.props.database.loadAllRecords()

    return etch.update(this)
  }

  async select (record) {
    this.selected = record

    return etch.update(this)
  }
}
