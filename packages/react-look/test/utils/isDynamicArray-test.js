import isDynamicArray from '../../modules/utils/isDynamicArray'

describe('Validating dynamic arrays', () => {

  it('should return true', () => {
    expect(isDynamicArray([ {} ])).to.eql(true)
    expect(isDynamicArray([ () => true ])).to.eql(true)
    expect(isDynamicArray([ 12, 45, 'bar', {} ])).to.eql(true)
    expect(isDynamicArray([ [] ])).to.eql(true)
  })

  it('should return false', () => {
    expect(isDynamicArray([ 12, 13 ])).to.eql(false)
    expect(isDynamicArray([ 'foo', '3' ])).to.eql(false)
    expect(isDynamicArray([ 12, 'foo', 'bar', 42 ])).to.eql(false)
  })
})
