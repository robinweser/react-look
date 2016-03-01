import copyProperties from '../../modules/utils/copyProperties'

describe('Copying props', () => {
  it('should copy props form one to another element', () => {
    const input = { a: 1, b: 2 }
    const output = { }
    copyProperties(input, output)
    expect(output).to.eql(input)
  })

  it('should ignore prototype props', () => {
    const input = { a: 1, b: 2, callee: () => {} }
    const output = { }
    copyProperties(input, output)
    expect(output.callee).to.eql(undefined)
  })
})
