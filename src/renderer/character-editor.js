import CharacterEditorView from './character-editor-view'

export default class CharacterEditor {
  static edit (record, heroEnv) {
    return new CharacterEditor(record, heroEnv)
  }

  constructor (record, heroEnv) {
    this.record = record
    this.heroEnv = heroEnv
  }

  getRecord () {
    return this.record
  }

  getView () {
    if (!this.view) {
      this.view = new CharacterEditorView({ editor: this, record: this.record })
    }

    return this.view
  }
}
