import {expect} from 'chai'

import CampaignInfo from '../../src/hero/campaign-info'

describe('CampaignInfo', function () {
  let campaignInfo

  it('can be serialized', function () {
    campaignInfo = new CampaignInfo()

    expect(campaignInfo.serialize()).to.equal('{"type":"CampaignInfo","name":"","genre":"","gameMaster":""}')
  })

  it('can be deserialized', function () {
    campaignInfo = new CampaignInfo()
    campaignInfo.deserialize('{"type":"CampaignInfo","name":"foo","genre":"bar","gameMaster":"baz"}')

    expect(campaignInfo.name).to.equal('foo')
    expect(campaignInfo.genre).to.equal('bar')
    expect(campaignInfo.gameMaster).to.equal('baz')
  })

  describe('defaults', function () {
    beforeEach(function () {
      campaignInfo = new CampaignInfo()
    })

    it('has an empty name', function () {
      expect(campaignInfo.name).to.equal('')
    })

    it('has an empty genre', function () {
      expect(campaignInfo.genre).to.equal('')
    })

    it('has an empty game master', function () {
      expect(campaignInfo.gameMaster).to.equal('')
    })
  })
})
