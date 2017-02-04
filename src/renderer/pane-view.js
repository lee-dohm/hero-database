/** @jsx etch.dom */

import etch from 'etch'

export default class PaneView {
  constructor (props, children) {
    this.props = props
    this.children = children

    this.handleEvents()

    etch.initialize(this)
  }

  render () {
    return (
      <div id='pane-view'>
        {this.children}
      </div>
    )
  }

  update (props, children) {
    this.props = props
    this.children = children

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }

  handleEvents () {
    this.props.pane.observeEditor((editor) => {
      if (editor) {
        this.children = [editor.getView().render()]
      } else {
        this.children = []
      }

      return etch.update(this)
    })
  }
}
