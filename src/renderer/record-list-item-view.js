/** @jsx etch.dom */

import etch from 'etch'

export default class RecordListItemView {
  constructor (props) {
    this.updateProps(props)

    etch.initialize(this)
  }

  render () {
    return <li className={this.getClassName()} on={{click: this.onClick}}>{this.record.name}</li>
  }

  update (props) {
    this.updateProps(props)

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  onClick (e) {
    e.preventDefault()

    this.heroEnv.workspace.open(this.record)
    this.parent.select(this.record)
  }

  getClassName () {
    let className = 'record'

    if (this.selected) {
      className += ' selected'
    }

    return className
  }

  updateProps (props) {
    const {heroEnv, parent, record, selected} = props

    this.props = props
    this.heroEnv = heroEnv
    this.parent = parent
    this.record = record
    this.selected = selected
  }
}
