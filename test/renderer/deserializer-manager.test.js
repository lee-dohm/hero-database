import '../support'

import DeserializerManager from '../../src/renderer/deserializer-manager'

function buildDeserializer (typeName, fn = () => {}) {
  return {
    name: typeName,
    deserialize: fn
  }
}

describe('DeserializerManager', function () {
  let manager

  beforeEach(function () {
    manager = new DeserializerManager({})
  })

  it('starts empty', function () {
    expect(manager.getCount()).to.equal(0)
  })

  describe('add', function () {
    it('adds a single deserializer', function () {
      const deserializer = buildDeserializer('Foo')

      manager.add(deserializer)

      expect(manager.getCount()).to.equal(1)
      expect(manager.get('Foo')).to.equal(deserializer)
    })

    it('adds multiple deserializers', function () {
      const foo = buildDeserializer('Foo')
      const bar = buildDeserializer('Bar')

      manager.add(foo, bar)

      expect(manager.getCount()).to.equal(2)
      expect(manager.get('Foo')).to.equal(foo)
      expect(manager.get('Bar')).to.equal(bar)
    })

    it('throws an error when the deserializer has no name', function () {
      const fn = () => { manager.add({ deserialize: () => {} }) }

      expect(fn).to.throw()
    })

    it('throws an error when the deserializer has no deserialize function', function () {
      const fn = () => { manager.add({ name: 'Foo' }) }

      expect(fn).to.throw()
    })
  })

  describe('deserialize', function () {
    it('allows you to deserialize state', function () {
      const heroEnv = {}
      const foo = buildDeserializer('Foo', (state, heroEnv) => {
        let returnState = state
        state.heroEnv = heroEnv

        return returnState
      })

      manager = new DeserializerManager(heroEnv)
      manager.add(foo)
      let obj = manager.deserialize({ '__typeName': 'Foo', test: 5 })

      expect(obj.test).to.equal(5)
      expect(obj.heroEnv).to.equal(heroEnv)
    })
  })

  it('returns the state object if there is no deserializer', function () {
    const state = {}
    manager = new DeserializerManager({})

    expect(manager.deserialize(state)).to.equal(state)
  })
})
