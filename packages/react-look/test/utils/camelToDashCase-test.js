import camelToDashCase from '../../modules/utils/camelToDashCase'

describe('Converting camel case to dash case', () => {

  it('should work as expected', () => {
    expect(camelToDashCase('fontSize')).to.eql('font-size')
    expect(camelToDashCase('borderLeftWidth')).to.eql('border-left-width')
  })

  it('sould add an additional - for vendor-prefixes', () => {
    expect(camelToDashCase('WebkitFlexDirection')).to.eql('-webkit-flex-direction')
    expect(camelToDashCase('msFlexDirection')).to.eql('-ms-flex-direction')
  })
})
