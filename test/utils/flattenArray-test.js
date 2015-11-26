import flattenArray from '../../lib/utils/flattenArray'
import { expect } from 'chai'

describe('Flattening arrays', () => {

  it('should flatten deeply nested arrays', () => {
    expect(flattenArray([1, 2, [11, 12, [21, [31, 'end'], 13]]])).to.eql([1, 2, 11, 12, 21, 31, 'end', 13])
    expect(flattenArray([[[[[[[[[[[3]]]]]]]]]]])).to.eql([3])
  })
})
