import substr from '../../../lib/mixins/pseudoClasses/substr'
import { expect } from 'chai'

describe('Evaluating :contains pseudo', () => {

  it('should split children at substrings and add styles', () => {
    const numbers = {newProps: {children: 'foo12bar'}}

    substr(':substr([0-9])', true, ':subsr', numbers)
    expect(numbers.newProps.children instanceof Array).to.eql(true)
    expect(numbers.newProps.children[0]).to.eql('foo')
    expect(numbers.newProps.children[1]).to.have.deep.property('props.children', '1')
    expect(numbers.newProps.children[1]).to.have.deep.property('props.style', true)
    expect(numbers.newProps.children[2]).to.have.deep.property('props.children', '2')
    expect(numbers.newProps.children[2]).to.have.deep.property('props.style', true)
    expect(numbers.newProps.children[3]).to.eql('bar')
  })

  it('should do nothing if no match was found', () => {
    const numbers = {newProps: {children: 'foobar'}}

    substr(':substr([0-9])', true, ':subsr', numbers)
    expect(numbers.newProps.children).to.eql('foobar')
  })
})
