import generateUniqueClassName from '../../lib/utils/generateUniqueClassName'
import { expect } from 'chai'

describe('Generating unique selectors', () => {

  it('should generate a unique selector starting with c-', () => {
    expect(generateUniqueClassName({fontSize: 13}).substr(0, 2)).to.eql('c-')
  })

  it('should generate a unique selector for every style object', () => {
    const input1 = generateUniqueClassName({fontSize: 13})
    const input2 = generateUniqueClassName({fontSize: 12})
    expect(input1).to.not.eql(input2)
  })

  it('should generate the same selector with the same input', () => {
    const input1 = generateUniqueClassName({fontSize: 12})
    const input2 = generateUniqueClassName({fontSize: 12})
    expect(input1).to.eql(input2)
  })

  it('should generate the same selector with the same properties even in different order', () => {
    const input1 = generateUniqueClassName({
      fontSize: 12,
      color: 'red'
    })
    const input2 = generateUniqueClassName({
      color: 'red',
      fontSize: 12
    })
    expect(input1).to.eql(input2)
  })
})
