import '../support'

import CampaignInfoBlock from '../../src/hero/campaign-info-block'

describe('CampaignInfoBlock', function () {
  let block

  it('can be serialized', function () {
    block = new CampaignInfoBlock()

    expect(block.serialize()).to.equal('{"type":"CampaignInfoBlock","name":"","genre":"","gameMaster":""}')
  })

  it('can be deserialized', function () {
    block = new CampaignInfoBlock()
    block.deserialize('{"type":"CampaignInfoBlock","name":"foo","genre":"bar","gameMaster":"baz"}')

    expect(block.name).to.equal('foo')
    expect(block.genre).to.equal('bar')
    expect(block.gameMaster).to.equal('baz')
  })

  describe('defaults', function () {
    beforeEach(function () {
      block = new CampaignInfoBlock()
    })

    it('has an empty name', function () {
      expect(block.name).to.equal('')
    })

    it('has an empty genre', function () {
      expect(block.genre).to.equal('')
    })

    it('has an empty game master', function () {
      expect(block.gameMaster).to.equal('')
    })
  })
})
