import firstLetter from '../../modules/mixins/firstLetter'

describe('Styling the first letter', () => {
  it('should split children and add styles to the first letter', () => {
    const comp = { children: 'foobar' }

    firstLetter(TestUtils.mockMixinInterface(':first-letter', true, ':first-letter', comp))

    expect(comp.children instanceof Array).to.eql(true)
    expect(comp.children[0]).to.have.deep.property('props.children', 'f')
    expect(comp.children[0]).to.have.deep.property('props.style', true)

    expect(comp.children[1]).to.eql('oobar')
  })

  it('should do nothing if children is not a string', () => {
    const arr = { children: [ 'foobar' ] }
    const obj = { children: { type: 'div' } }

    firstLetter(TestUtils.mockMixinInterface(':first-letter', true, ':first-letter', arr))
    expect(arr.children).to.eql([ 'foobar' ])

    firstLetter(TestUtils.mockMixinInterface(':first-letter', true, ':first-letter', obj))
    expect(obj.children).to.eql({ type: 'div' })
  })
})
