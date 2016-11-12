import '../support'

import CharacterEntryView from '../../src/renderer/character-entry-view'

describe('CharacterEntryView', function () {
  let view

  beforeEach(function () {
    view = new CharacterEntryView({file: 'foo', name: 'Foo'})
  })

  it('formats the view element', function () {
    expect(view.element.outerHTML).to.equal('<div class="character-entry-view">Foo</div>')
  })

  describe('when the view is updated', function () {
    beforeEach(function () {
      return view.update({file: 'foo', name: 'Bar'})
    })

    it('updates the inner text', function () {
      expect(view.element.outerHTML).to.equal('<div class="character-entry-view">Bar</div>')
    })
  })
})
