import generateClassName from '../../modules/utils/generateClassName'
import { expect } from 'chai'

describe('Generating unique selectors', () => {


  it('should generate a unique selector for every style object', () => {
    const input1 = generateClassName({ fontSize: 13 })
    const input2 = generateClassName({ fontSize: 12 })
    expect(input1).to.not.eql(input2)
  })

  it('should generate the same selector with the same input', () => {
    const input1 = generateClassName({ fontSize: 12 })
    const input2 = generateClassName({ fontSize: 12 })
    expect(input1).to.eql(input2)
  })

  it('should generate the same selector with the same properties even in different order', () => {
    const input1 = generateClassName({ fontSize: 12, color: 'red' })
    const input2 = generateClassName({ color: 'red', fontSize: 12 })
    expect(input1).to.eql(input2)
  })
})
