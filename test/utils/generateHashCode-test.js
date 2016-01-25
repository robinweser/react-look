import generateHashCode from '../../modules/utils/generateHashCode'
import { expect } from 'chai'

describe('Generating hash codes', () => {

  it('should generate a unique hash string', () => {
    expect(generateHashCode('font-size:12px')).to.eql('gich50')
    expect(generateHashCode('font-size:13px')).to.not.eql('gich50')
  })

  it('should always generate the same hash with the same input', () => {
    const input1 = generateHashCode('font-size:12px')
    const input2 = generateHashCode('font-size:12px')
    expect(input1).to.eql(input2)
  })

  it('should return 0 if string is empty', () => {
    expect(generateHashCode('')).to.eql(0)
  })
})
