/** @jsx etch.dom */

import etch from 'etch'

import RecordView from './record-view'

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
    return (
      <div className='database-view'>
        <div className="records list">
          {
            this.records.map((record) => {
              return <RecordView heroEnv={this.props.heroEnv} record={record} />
            })
          }
        </div>
        <button className="btn" type="button" onclick={this.onNewRecordClick.bind(this)}>
          New Record
        </button>
      </div>
    )
  }

  async update (props) {
    this.props = props

    this.records = await this.props.database.loadAllRecords()

    return etch.update(this)
  }

  async onNewRecordClick (e) {
    e.preventDefault()
  }

  destroy () {
    etch.destroy(this)
  }
}
