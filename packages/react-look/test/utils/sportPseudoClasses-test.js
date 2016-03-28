import sortPseudoClasses from '../../modules/utils/sortPseudoClasses'

describe('Sorting pseudo classes according LVHA', () => {
  it('should return -1', () => {
    expect(sortPseudoClasses(':link', ':active')).to.eql(-1)
  })

  it('should return 1', () => {
    expect(sortPseudoClasses(':active', ':link')).to.eql(1)
  })

  it('should return neutral 0', () => {
    expect(sortPseudoClasses(':active', ':before')).to.eql(0)
  })
})
