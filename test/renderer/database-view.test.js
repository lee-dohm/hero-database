import '../support'

import DatabaseView from '../../src/renderer/database-view'

describe('DatabaseView', function () {
  let database, view

  beforeEach(function () {
    database = {
      items: [
          {file: 'foo.character', name: 'Foo'},
          {file: 'bar.character', name: 'Bar'}
      ]
    }

    view = new DatabaseView({items: database.items})

    return view.update({items: database.items})
  })

  it('renders the view element', function () {
    expect(view.element.outerHTML).to.equal('<div class="database-view"><div class="title">Characters</div><div class="characters list"><div class="character-entry-view">Foo</div><div class="character-entry-view">Bar</div></div></div>')
  })
})
