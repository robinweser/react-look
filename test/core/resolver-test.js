import { expect } from 'chai'
import React, { Component } from 'react'
import StyleSheet from '../../modules/api/StyleSheet'
import resolveStyles from '../../modules/core/resolver'

describe('Resolving styles', () => {
  it('should return the element if no look is provided', () => {
    const Component = { state: { } }
    const element = <div/>
    expect(resolveStyles(Component, element, { })).to.eql(element)
  })

  it('should resolve basic styles', () => {
    const Component = { state: { } }
    const element = <div look={{ color: 'red' }}/>

    const resolved = resolveStyles(Component, element, { })
    expect(resolved.props.style).to.eql({ color: 'red' })
  })

  it('should resolve an array of looks', () => {
    const Component = { state: { } }
    const element = <div look={[ {color: 'red'}, {fontSize: 14} ]}/>

    const resolved = resolveStyles(Component, element, { })
    expect(resolved.props.style).to.eql({
      color: 'red',
      fontSize: 14
    })
  })

  it('should resolve scoped styles', () => {
    const Component = { state: { }, _lookScope: 'Test' }
    const styles = StyleSheet.create('Test', { color: 'red' })

    const element = <div look={styles}/>
    const resolved = resolveStyles(Component, element, { })
    expect(resolved.props.style).to.eql({ color: 'red' })
  })

  it('should add parent information to the props', () => {
    const Component = { state: { } }
    const element = <div look={{ color: 'red' }}/>
    const resolved = resolveStyles(Component, element, { }, true)
    expect(resolved.props._parent).to.eql(true)
  })

  it('should resolve children', () => {
    const Component = { state: { } }
    const element = (<div><span look={{ color: 'red' }}/></div>)
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.children.props.style).to.eql({
      color: 'red'
    })
  })

  it('should resolve elements passed as a prop', () => {
    const Component = { state: { } }
    const span = <span look={{ color: 'red' }}/>
    const element = <div el={span}/>
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.el.props.style).to.eql({
      color: 'red'
    })
  })
})

describe('Resolving children', () => {
  it('should return children if it is a string or number', () => {
    const Component = { state: { } }
    const child = 3
    const element = (<div>{child}</div>)
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.children).to.eql(child)
  })

  it('should flatten the children', () => {
    const Component = { state: { } }
    const element = (<div>{[ 3, 4, [ 5, 6 ] ]}</div>)
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.children).to.eql([ 3, 4, 5, 6 ])
  })
})

describe('Processing styles', () => {
  it('should merge with predefined styles', () => {
    const Component = { state: { } }
    const element = <div look={{ color: 'red' }} style={{ fontSize: 15 }} />
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.style).to.eql({
      color: 'red',
      fontSize: 15
    })
  })

  it('should resolve plugins', () => {
    const Component = { state: { } }
    const element = <div look={{ color: 'red' }} />
    const resolved = resolveStyles(Component, element, {
      plugins: [ (styles) => styles ]
    })

    expect(resolved.props.style).to.eql({ color: 'red' })
  })
})
