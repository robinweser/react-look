import sortObject from '../../utils/sortObject'

describe('Sorting objects', () => {
  it('should sort object keys in alphabetic order', () => {
    const input = {
      a: 3,
      x: 5,
      b: 4,
      d: 2
    }
    const output = {
      a: 3,
      b: 4,
      d: 2,
      x: 5
    }
    expect(sortObject(input)).to.eql(output)

    const input2 = { ac: 3, ax: 5, ab: 4 }
    const output2 = { ab: 4, ac: 3, ax: 5 }
    expect(sortObject(input2)).to.eql(output2)
  })

  it('should sort nested objects', () => {
    const input = {
      a: 3,
      x: 5,
      b: {
        x: 12,
        b: 24
      },
      d: 2
    }
    const output = {
      a: 3,
      b: {
        b: 24,
        x: 12
      },
      d: 2,
      x: 5
    }
    expect(sortObject(input)).to.eql(output)
  })
})
