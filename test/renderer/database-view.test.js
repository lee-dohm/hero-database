import {expect} from 'chai'

import DatabaseView from '../../src/renderer/database-view'

import {waitsForPromise} from './renderer-helpers'

describe('DatabaseView', function () {
  let database, view

  beforeEach(function (done) {
    database = {
      items: [
          {file: 'foo.character', name: 'Foo'},
          {file: 'bar.character', name: 'Bar'}
      ]
    }

    view = new DatabaseView({database: database})

    waitsForPromise(done, () => { return view.update({database: database}) })
  })

  it('renders the view element', function () {
    expect(view.element.outerHTML).to.equal('<div class="database-view"><div class="title">Characters</div><div class="characters list"><div class="character-entry-view">Foo</div><div class="character-entry-view">Bar</div></div></div>')
  })
})
