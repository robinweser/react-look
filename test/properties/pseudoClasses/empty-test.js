import isEmpty from '../../../lib/properties/pseudoClasses/empty'
import { expect } from 'chai'

describe('Evaluating empty elements', () => {

  it('should validate true', () => {
    let emptyChildren = {
      newProps: {
        children: []
      }
    }
    let noChildren = {newProps: {}}
    expect(isEmpty(':empty', true, ':empty', emptyChildren)).to.equal(true)
    expect(isEmpty(':empty', true, ':empty', noChildren)).to.equal(true)
  })

  it('should validate false', () => {
    let args = {
      newProps: {
        children: ['test']
      }
    }

    expect(isEmpty(':empty', true, ':empty', args)).to.equal(false)
  })
})