import cssifyObject from '../../lib/utils/cssifyObject'
import { expect } from 'chai'

describe('Converting a style object to a CSS string', () => {

  it('should use dash case CSS properties', () => {
    expect(cssifyObject({flexDirection: 'row'})).to.eql('flex-direction:row')
  })
  it('should add semicolons between rules', () => {
    expect(cssifyObject({flexDirection: 'row', fontSize: '12px'})).to.eql('flex-direction:row;font-size:12px')
  })
  it('should add units to unitless values', () => {
    expect(cssifyObject({width: 10})).to.eql('width:10px')
  })
  it('should not add units if the value is 0', () => {
    expect(cssifyObject({width: 0})).to.eql('width:0')
  })
  it('should return an empty string if the object is empty', () => {
    expect(cssifyObject({})).to.eql('')
  })
  it('should return an empty string if styles is not an object', () => {
    expect(cssifyObject(12)).to.eql('')
  })
})
