import isPseudo from '../../modules/utils/isPseudo'

describe('Validating pseudo classes', () => {

  it('should return true', () => {
    expect(isPseudo(':hover')).to.eql(true)
  })

  it('should return false', () => {
    expect(isPseudo(' :hover')).to.eql(false)
    expect(isPseudo('hover')).to.eql(false)
    expect(isPseudo('@media ()')).to.eql(false)
  })
})
