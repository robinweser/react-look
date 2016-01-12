import firstLetter from '../../lib/mixins/firstLetter'
import { expect } from 'chai'

describe('Styling the first letter', () => {

  it('should split children and add styles to the first letter', () => {
    const comp = {newProps: {children: 'foobar'}}

    firstLetter(':first-letter', true, ':first-letter', comp)
    expect(comp.newProps.children instanceof Array).to.eql(true)
    expect(comp.newProps.children[0]).to.have.deep.property('props.children', 'f')
    expect(comp.newProps.children[0]).to.have.deep.property('props.style', true)

    expect(comp.newProps.children[1]).to.eql('oobar')
  })

  it('should do nothing if children is not a string', () => {
    const arr = {
      newProps: {
        children: ['foobar']
      }
    }
    const obj = {
      newProps: {
        children: {
          type: 'div'
        }
      }
    }

    firstLetter(':first-letter', true, ':first-letter', arr)
    expect(arr.newProps.children).to.eql(['foobar'])

    firstLetter(':first-letter', true, ':first-letter', obj)
    expect(obj.newProps.children).to.eql({type: 'div'})
  })
})
