import {expect} from 'chai'

import DatabaseView from '../../src/renderer/database-view'

import {waitsForPromise} from './renderer-helpers'

describe('DatabaseView', function () {
  let database, view

  beforeEach(function (done) {
    database = [
      {file: 'foo.character', name: 'Foo'},
      {file: 'bar.character', name: 'Bar'}
    ]

    view = new DatabaseView(database)

    waitsForPromise(done, () => { return view.update(database) })
  })

  it('renders the view element', function () {
    expect(view.element.outerHTML).to.equal('<div class="database-view"><header><span class="title">Characters</span></header><div class="character-entry-view">Foo</div><div class="character-entry-view">Bar</div></div>')
  })
})
