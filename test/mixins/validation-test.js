import { valid, invalid, inRange, outOfRange } from '../../modules/mixins/validation'
import { expect } from 'chai'

describe('Resolving input validation', () => {
  it('should return false', () => {
    const Component = {
      state: {
        _look: new Map()
      },
      refs: {
        foo: {
          validity: {
            valid: false
          }
        }
      }
    }
    const element = { type: 'input', ref: 'foo', props: { } }
    const newProps = { }
    expect(valid('', true, '', { Component, element, newProps })).to.eql(false)
    expect(invalid('', true, '', { Component, element, newProps })).to.eql(false)
    expect(inRange('', true, '', { Component, element, newProps })).to.eql(false)
    expect(outOfRange('', true, '', {
      Component,
      element,
      newProps
    })).to.eql(false)
  })

  it('should return true', () => {
    const Component = {
      setState(state) {
        this.state._look = state
      },
      state: {
        _look: new Map()
      },
      refs: {
        foo: {
          validity: {
            valid: true,
            rangeUnderflow: false,
            rangeOverflow: false
          }
        }
      }
    }
    const element = { type: 'input', ref: 'foo', props: { } }
    const newProps = { }
    valid('', true, '', { Component, element, newProps })
    newProps.onChange()
    expect(valid('', true, '', { Component, element, newProps })).to.eql(true)

    Component.refs.foo.validity.valid = false
    const newProps2 = { }
    invalid('', true, '', {
      Component,
      element,
      newProps: newProps2
    })
    newProps2.onChange()
    expect(invalid('', true, '', {
      Component,
      element,
      newProps: newProps2
    })).to.eql(true)

    const newProps3 = { }
    inRange('', true, '', {
      Component,
      element,
      newProps: newProps3
    })
    newProps3.onChange()
    expect(inRange('', true, '', {
      Component,
      element,
      newProps: newProps3
    })).to.eql(true)

    Component.refs.foo.validity = {
      rangeOverflow: true,
      rangeUnderflow: true
    }
    const newProps4 = { }
    outOfRange('', true, '', {
      Component,
      element,
      newProps: newProps4
    })
    newProps4.onChange()
    expect(outOfRange('', true, '', {
      Component,
      element,
      newProps: newProps4
    })).to.eql(true)
  })
})
