import { hover, focus, active } from '../../../lib/properties/pseudoClasses/userAction'
import State from '../../../lib/api/State'
import { expect } from 'chai'


let args = {
  Component: {
    state: {
      _look: new Map()
    }
  },
  element: {
    type: 'input',
    props: {},
    key: 'unique'
  },
  newProps: {}
}

describe('Evaluating hover pseudos', () => {

  hover(':hover', true, ':hover', args)

  it('should add a mouseEnter listener', () => {
    expect(args.newProps).to.have.property('onMouseEnter')
  })
  it('should add a mouseLeave listener', () => {
    expect(args.newProps).to.have.property('onMouseLeave')
  })

  it('should set an initial state', () => {
    expect(State.has(args.Component, args.element.key)).to.equal(true)
    expect(State.get(args.Component, args.element.key)).to.eql({})
  })
})


describe('Evaluating focus pseudos', () => {

  focus(':focus', true, ':focus', args)

  it('should add a onFocus listener', () => {
    expect(args.newProps).to.have.property('onFocus')
  })

  it('should add a onBlur listener', () => {
    expect(args.newProps).to.have.property('onBlur')
  })

  it('should set an initial state', () => {
    expect(State.has(args.Component, args.element.key)).to.equal(true)
    expect(State.get(args.Component, args.element.key)).to.eql({})
  })
})


describe('Evaluating active pseudos', () => {

  active(':active', true, ':active', args)

  it('should add a mouseDown listener', () => {
    expect(args.newProps).to.have.property('onMouseDown')
  })

  it('should set an initial state', () => {
    expect(State.has(args.Component, args.element.key)).to.equal(true)
    expect(State.get(args.Component, args.element.key)).to.eql({})
  })
})
