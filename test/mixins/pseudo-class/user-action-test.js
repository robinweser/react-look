import UserAction from '../../../lib/mixins/pseudo-class/user-action'
import State from '../../../lib/api/State'
import React from 'react/addons'
import {expect} from 'chai'

//Separating mixin functions for better testing
let isActive, isFocused, isHovered

UserAction.forEach(mixin => {
  switch (mixin.key) {
    case ':hover':
      isHovered = mixin.fn
      break
    case ':focus':
      isFocused = mixin.fn
      break
    case ':active':
      isActive = mixin.fn
      break
  }
})

let args = {
  Component: {
    state: {
      _look : new Map()
    },
  },
  element : {
    props : {},
    key: 'unique'
  },
  newProps : {}
}

describe('Evaluating hover pseudos', () => {
  isHovered(':hover', true, args)

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
  isFocused(':blur', true, args)

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
  isActive(':active', true, args)

  it('should add a mouseDown listener', () => {
    expect(args.newProps).to.have.property('onMouseDown')
  })

  it('should set an initial state', () => {
    expect(State.has(args.Component, args.element.key)).to.equal(true)
    expect(State.get(args.Component, args.element.key)).to.eql({})
  })
})
