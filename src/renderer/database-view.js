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
      <div className='database-view records list'>
        {
          this.records.map((record) => {
            return <RecordView record={record} />
          })
        }
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
}
