import isEmpty from '../../lib/mixins/empty'
import { expect } from 'chai'

describe('Evaluating empty elements', () => {

  it('should validate true', () => {
    const emptyChildren = {
      newProps: {
        children: []
      }
    }
    const noChildren = {newProps: {}}
    expect(isEmpty(':empty', true, ':empty', emptyChildren)).to.equal(true)
    expect(isEmpty(':empty', true, ':empty', noChildren)).to.equal(true)
  })

  it('should validate false', () => {
    const args = {
      newProps: {
        children: ['test']
      }
    }

    expect(isEmpty(':empty', true, ':empty', args)).to.equal(false)
  })
})
