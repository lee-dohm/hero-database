import RecordEditorView from './record-editor-view'

export default class RecordEditor {
  constructor (record, heroEnv) {
    this.record = record
    this.heroEnv = heroEnv

    this.view = new RecordEditorView({record: record, recordEditor: this})
  }

  getRecord () {
    return this.record
  }

  getView () {
    return this.view
  }
}
