/** @jsx etch.dom */

import etch from 'etch'

import CharacterEntryView from './character-entry-view'
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
        <div className='title'>
          Records
        </div>
        <div className='records list'>
          {
            this.records.map((record) => {
              return <RecordView record={record} />
            })
          }
        </div>
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
