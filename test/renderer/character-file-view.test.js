import {expect} from 'chai'

import CharacterFileView from '../../src/renderer/character-file-view'

describe('CharacterFileView', function () {
  describe('constructor', function () {
    it('formats the view element', function () {
      let view = new CharacterFileView({file: 'foo', name: 'Foo'})

      expect(view.element.outerHTML).to.equal('<div class="character-file-view">Foo</div>')
    })
  })
})
