import {expect} from 'chai'

import CharacterFileView from '../../src/renderer/character-file-view'

import {waitsForPromise} from './renderer-helpers'

describe('CharacterFileView', function () {
  let view

  beforeEach(function () {
    view = new CharacterFileView({file: 'foo', name: 'Foo'})
  })

  it('formats the view element', function () {
    expect(view.element.outerHTML).to.equal('<div class="character-file-view">Foo</div>')
  })

  describe('when the view is updated', function () {
    beforeEach(function (done) {
      waitsForPromise(done, () => {
        return view.update({file: 'foo', name: 'Bar'})
      })
    })

    it('updates the inner text', function () {
      expect(view.element.outerHTML).to.equal('<div class="character-file-view">Bar</div>')
    })
  })
})
