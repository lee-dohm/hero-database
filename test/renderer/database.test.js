import {expect} from 'chai'
import fs from 'fs'
import os from 'os'
import {rimraf} from 'rimraf'
import temp from 'temp'

import Database from '../../src/renderer/database'

temp.track()

describe('Database', function () {
  let database, tempPath

  afterEach(function (done) {
    if (tempPath && fs.existsSync(tempPath)) {
      rimraf(tempPath, done)
    } else {
      done()
    }
  })

  describe('constructor', function () {
    it('throws an error when given an undefined database path', function () {
      const fn = () => { database = new Database(undefined, {}) }

      expect(fn).to.throw()
    })

    it('throws an error when given an empty database path', function () {
      const fn = () => { database = new Database('', {}) }

      expect(fn).to.throw()
    })

    it('throws an error when given an undefined hero environment', function () {
      const fn = () => { database = new Database(os.tmpdir(), undefined) }

      expect(fn).to.throw()
    })

    it('initializes the database path', function () {
      database = new Database(os.tmpdir(), {})

      expect(database.getPath()).to.equal(os.tmpdir())
    })

    it('initializes the hero environment', function () {
      let mockHeroEnv = {}
      database = new Database(os.tmpdir(), mockHeroEnv)

      expect(database.heroEnv).to.equal(mockHeroEnv)
    })

    it('creates the path if it does not exist', function () {
      let tempPath = temp.path('hero-database')
      database = new Database(tempPath, {})

      expect(fs.existsSync(tempPath)).to.be.ok
    })
  })
})
