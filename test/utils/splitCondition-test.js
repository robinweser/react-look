import splitCondition from '../../lib/utils/splitCondition'
import { expect } from 'chai'

describe('Splitting conditions', () => {

  it('should replace left by props value and return left and right', () => {
    const Component = {props: {active: true}}
    const output = {left: 'true', right: 'true'}

    expect(splitCondition('active=true', '=', Component)).to.eql(output)
  })

  it('should resolve number values as numbers', () => {
    const Component = {props: {clicks: 3}}
    const output = {left: 3, right: '2'}

    expect(splitCondition('clicks>=2', '>=', Component)).to.eql(output)
  })

  it('should return false if left is not part of props or state', () => {
    expect(splitCondition('active=true', '=', {})).to.eql(false)
  })

  it('should return false if the operator does not match', () => {
    expect(splitCondition('active=true', '!=', {})).to.eql(false)
  })
})
