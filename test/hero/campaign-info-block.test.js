import '../support'

import CampaignInfoBlock from '../../src/hero/campaign-info-block'

describe('CampaignInfoBlock', function () {
  let block

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

  describe('serialization', function () {
    beforeEach(function () {
      block = new CampaignInfoBlock()
      block.name = 'foo'
      block.genre = 'bar'
      block.gameMaster = 'baz'
    })

    it('works', function () {
      const state = block.serialize()
      const newBlock = CampaignInfoBlock.deserialize(state)

      expect(newBlock).to.be.instanceof(CampaignInfoBlock)
      expect(newBlock).to.deep.equal(block)
    })
  })

  describe('calculating cost', function () {
    it('returns null', function () {
      block = new CampaignInfoBlock()

      expect(block.getTotalCost()).to.equal(null)
    })
  })
})
