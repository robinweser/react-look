import getPseudoExpression from '../../modules/utils/getPseudoExpression'
import { expect } from 'chai'

describe('Extracting pseudo expressions', () => {

  it('should only extract the expression', () => {
    expect(getPseudoExpression(':nth-child(3n+2)')).to.eql('3n+2')
  })

  it('should return false if there is no expression included', () => {
    expect(getPseudoExpression(':nth-child')).to.eql(false)
  })
})
