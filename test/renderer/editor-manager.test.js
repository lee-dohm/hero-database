import '../support'

import EditorManager from '../../src/renderer/editor-manager'

function buildEditor (name, fn = () => {}) {
  return {
    name: name,
    edit: fn
  }
}

describe('EditorManager', function () {
  let heroEnv, manager

  beforeEach(function () {
    heroEnv = {}
    manager = new EditorManager(heroEnv)
  })

  it('starts empty', function () {
    expect(manager.getCount()).to.equal(0)
  })

  describe('add', function () {
    it('adds a single editor', function () {
      const editor = buildEditor('Foo')

      manager.add(editor)

      expect(manager.getCount()).to.equal(1)
      expect(manager.get('Foo')).to.equal(editor)
    })

    it('adds multiple editors', function () {
      const foo = buildEditor('Foo')
      const bar = buildEditor('Bar')

      manager.add(foo, bar)

      expect(manager.getCount()).to.equal(2)
      expect(manager.get('Foo')).to.equal(foo)
      expect(manager.get('Bar')).to.equal(bar)
    })

    it('throws an error when the editor has no name', function () {
      const fn = () => { manager.add({ edit: () => {} }) }

      expect(fn).to.throw()
    })

    it('throws an error when the editor has no edit function', function () {
      const fn = () => { manager.add({ name: 'Foo' }) }

      expect(fn).to.throw()
    })
  })

  describe('buildEditor', function () {
    let fooEditor

    beforeEach(function () {
      fooEditor = buildEditor('FooEditor', (record, heroEnv) => {
        return {
          heroEnv: heroEnv,
          record: record
        }
      })

      manager.add(fooEditor)
    })

    it('allows you to build an editor', function () {
      let record = { data: { '__typeName': 'Foo' } }
      let instance = manager.buildEditor(record)

      expect(instance.record).to.equal(record)
      expect(instance.heroEnv).to.equal(heroEnv)
    })

    it('throws an error if there is no data attribute in the record object', function () {
      const fn = () => { manager.buildEditor({}) }

      expect(fn).to.throw()
    })

    it('throws an error if there is no __typeName attribute on the data object', function () {
      const fn = () => { manager.buildEditor({ data: {} }) }

      expect(fn).to.throw()
    })

    it('throws an error if there is no editor for the given record type', function () {
      const fn = () => { manager.buildEditor({ data: { '__typeName': 'Bar' } }) }

      expect(fn).to.throw()
    })
  })
})
