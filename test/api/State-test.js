import React, { Component } from 'react'
import State from '../../modules/api/State'
import look from '../../modules/core/enhancer'
import { expect } from 'chai'

describe('Using the State API', () => {
  it('should add a new element key', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance, 'key')
    expect(instance.state._look.get('key')).to.eql(new Map())
  })

  it('should use the default key if not specified', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance)
    expect(instance.state._look.get('root')).to.eql(new Map())
  })

  it('should check if a key is existing', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance, 'key')
    expect(State.has(instance, 'key')).to.eql(true)
    expect(State.has(instance, 'key2')).to.eql(false)
  })

  it('should return a specific state', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance, 'key')
    instance.state._look.get('key').set('hover', true)
    expect(State.getState('hover', instance, 'key')).to.eql(true)
    expect(State.getState('hover2', instance, 'key')).to.eql(undefined)
    expect(State.getState('hover', instance, 'key2')).to.eql(false)
  })

  it('should check if a keys state is existing', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance, 'key')
    instance.state._look.get('key').set('hover', true)
    expect(State.hasState('hover', instance, 'key')).to.eql(true)
    expect(State.hasState('hover2', instance, 'key')).to.eql(false)
    expect(State.hasState('hover', instance, 'key2')).to.eql(false)
  })

  it('should set a keys state', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.add(instance, 'key')
    State.setState('hover', true, instance, 'key')
    expect(State.getState('hover', instance, 'key')).to.eql(true)
  })

  it('should add missing keys before setting the state ', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    const instance = new Enhanced()

    State.setState('hover', true, instance, 'key')
    expect(State.has(instance, 'key')).to.eql(true)
    expect(State.getState('hover', instance, 'key')).to.eql(true)
  })
})
