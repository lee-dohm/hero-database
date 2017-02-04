/** @jsx etch.dom */

import etch from 'etch'

export default class RecordListItemView {
  constructor (props) {
    this.props = props

    etch.initialize(this)
  }

  render () {
    return <li className={this.getClassName()} onclick={this.onClick.bind(this)}>{this.props.record.name}</li>
  }

  update (props) {
    this.props = props

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  onClick (e) {
    e.preventDefault()

    this.props.heroEnv.workspace.open(this.props.record)
    this.props.parent.select(this.props.record)
  }

  getClassName () {
    let className = 'record'

    if (this.props.selected) {
      className += ' selected'
    }

    return className
  }
}
