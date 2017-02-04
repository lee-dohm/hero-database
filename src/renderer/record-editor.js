import RecordEditorView from './record-editor-view'

export default class RecordEditor {
  constructor (record) {
    this.record = record
    this.view = new RecordEditorView({record: record, recordEditor: this})
  }

  getRecord () {
    return this.record
  }

  getView () {
    return this.view
  }
}
