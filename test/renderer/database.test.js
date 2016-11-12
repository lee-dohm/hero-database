import {expect} from 'chai'
import os from 'os'

import Database from '../../src/renderer/database'

describe('Database', function () {
  describe('constructor', function () {
    it('throws an error when given an undefined database path', function () {
      const fn = function () { let foo = new Database(undefined, {}); return foo }

      expect(fn).to.throw()
    })

    it('throws an error when given an empty database path', function () {
      const fn = function () { let foo = new Database('', {}); return foo }

      expect(fn).to.throw()
    })

    it('throws an error when given an undefined hero environment', function () {
      const fn = function () { let foo = new Database(os.tmpdir(), undefined); return foo }

      expect(fn).to.throw()
    })

    it('initializes the database path', function () {
      let database = new Database(os.tmpdir(), {})

      expect(database.getPath()).to.equal(os.tmpdir())
    })

    it('initializes the hero environment', function () {
      let mockHeroEnv = {}
      let database = new Database(os.tmpdir(), mockHeroEnv)

      expect(database.heroEnv).to.equal(mockHeroEnv)
    })
  })
})
