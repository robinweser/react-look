import isBlank from '../../../lib/mixins/pseudoClasses/blank'
import { expect } from 'chai'

describe('Evaluating blank elements', () => {

  it('should validate true', () => {
    const blankChildren = {newProps: {children: ' '}}
    const notTrimmed = {newProps: {children: '   '}}
    expect(isBlank(':blank', true, ':blank', blankChildren)).to.equal(true)
    expect(isBlank(':blank', true, ':blank', notTrimmed)).to.equal(true)
  })

  it('should validate false', () => {
    const args1 = {
      newProps: {
        children: ['1']
      }
    }
    const args2 = {newProps: {children: '1'}}

    const args3 = {newProps: {children: 12}}
    const args4 = {
      newProps: {
        children: {
          type: 'div'
        }
      }
    }
    expect(isBlank(':blank', true, ':blank', args1)).to.equal(false)
    expect(isBlank(':blank', true, ':blank', args2)).to.equal(false)
    expect(isBlank(':blank', true, ':blank', args3)).to.equal(false)
    expect(isBlank(':blank', true, ':blank', args4)).to.equal(false)
  })
})
