import substr from '../../modules/mixins/substr'

describe('Styling substrings', () => {
  it('should split children at substrings and add styles', () => {
    const numbers = { children: 'foo12bar' }

    substr({
      property: ':substr([0-9])',
      value: true,
      mixinKey: ':substr',
      newProps: numbers
    })
    expect(numbers.children instanceof Array).to.eql(true)
    expect(numbers.children[0]).to.eql('foo')
    expect(numbers.children[1]).to.have.deep.property('props.children', '1')
    expect(numbers.children[1]).to.have.deep.property('props.style', true)
    expect(numbers.children[2]).to.have.deep.property('props.children', '2')
    expect(numbers.children[2]).to.have.deep.property('props.style', true)
    expect(numbers.children[3]).to.eql('bar')
  })

  it('should do nothing if no match was found', () => {
    const numbers = { children: 'foobar' }

    substr({
      property: ':substr([0-9])',
      value: true,
      mixinKey: ':substr',
      newProps: numbers
    })
    expect(numbers.children).to.eql('foobar')
  })

  it('should do nothing if children is not a string', () => {
    const arr = { children: [ 'foobar' ] }
    const obj = { children: { type: 'Text' } }

    substr({
      property: ':substr([0-9])',
      value: true,
      mixinKey: ':substr',
      newProps: arr
    })
    expect(arr.children).to.eql([ 'foobar' ])

    substr({
      property: ':substr([0-9])',
      value: true,
      mixinKey: ':substr',
      newProps: obj
    })
    expect(obj.children).to.eql({ type: 'Text' })
  })
})
