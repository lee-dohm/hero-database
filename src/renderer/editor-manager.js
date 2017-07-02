import RecordEditor from './record-editor'

/**
 * Manages the set of editors for record types.
 *
 * An {@link Editor} is an Object that handles editing of a particular type of record. This includes
 * creating the editor view when the editor is set to the active editor in the {@link Pane}. An
 * editor can be any object with a `name` property and an `edit` function. A common approach is to
 * register a constructor as the editor by adding an `edit` class method. When your `edit` method is
 * called it will be passed the {@link Record} containing the data as the first argument and the
 * {@link HeroEnvironment} as the second argument.
 *
 * An instance of this class is always available as `hero.editors`.
 *
 * ## Examples
 *
 * ```
 * hero.editors.add(CharacterEditor)
 *
 * let editor = hero.editors.buildEditor(characterRecord)
 * ```
 */
export default class EditorManager {
  constructor (heroEnv) {
    this.heroEnv = heroEnv
    this.editors = {}
  }

  /**
   * Adds one or more editors.
   *
   * @param {Object[]} editors Editors to register
   */
  add (...editors) {
    this.validate(...editors)

    for (let editor of editors) {
      this.editors[editor.name] = editor
    }
  }

  /**
   * Builds an editor for the given record.
   *
   * @param {Record} record Record to be edited
   * @returns {Object} Editor for the record
   */
  buildEditor (record) {
    if (record.data) {
      const editor = this.get(`${record.data['__typeName']}Editor`)

      if (editor) {
        return editor.edit(record, this.heroEnv)
      } else {
        return new RecordEditor(record, this.heroEnv)
      }
    } else {
      throw new Error(`${record} is not a Record`)
    }
  }

  /**
   * Returns the count of editors managed.
   */
  getCount () {
    return Object.keys(this.editors).length
  }

  get (name) {
    return this.editors[name]
  }

  validate (...editors) {
    for (let editor of editors) {
      if (!(editor.name && editor.edit)) {
        throw new Error(`${editor} is not an editor`)
      }
    }
  }
}
