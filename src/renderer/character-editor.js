import CharacterEditorView from './character-editor-view'

/**
 * Editor for {@link Character} records.
 */
export default class CharacterEditor {
  /**
   * Creates the editor for the record.
   *
   * @param {Record} record Record to be edited
   * @param {HeroEnvironment} heroEnv Application environment
   * @return {CharacterEditor} Editor for the record
   */
  static edit (record, heroEnv) {
    return new CharacterEditor(record, heroEnv)
  }

  /**
   * Constructs the editor.
   *
   * @param {Record} record Record to be edited
   * @param {HeroEnvironment} heroEnv Application environment
   */
  constructor (record, heroEnv) {
    this.record = record
    this.heroEnv = heroEnv
  }

  /**
   * Gets the record being edited.
   *
   * @return {Record}
   */
  getRecord () {
    return this.record
  }

  /**
   * Gets the view associated with the editor.
   *
   * @return {CharacterEditorView} View for the editor
   */
  getView () {
    if (!this.view) {
      this.view = new CharacterEditorView({ editor: this, heroEnv: this.heroEnv, record: this.record })
    }

    return this.view
  }
}
