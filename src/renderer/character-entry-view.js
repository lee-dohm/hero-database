/** @jsx etch.dom */

import etch from 'etch'

/**
 * Displays a Character entry in the {DatabaseView}.
 */
export default class CharacterEntryView {
  constructor (props, children) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return (
      <div className='character-entry-view'>{this.props.name}</div>
    )
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }
}
