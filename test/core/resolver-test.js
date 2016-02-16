import { expect } from 'chai'
import React, { Component } from 'react'
import { resolveChildren, isLookEnhanced, resolveProps, resolvePlugins } from '../../modules/core/resolver'
import resolveStyles from '../../modules/core/native/resolver'
import look from '../../modules/core/enhancer'
import _ from 'lodash'

const mockComponent = () => {
  return { state: { }, props: { }, context: { } }
}

describe('Resolving children', () => {
  it('should return children if it is a string or number', () => {
    const element = <div>
                      3
                    </div>
    const newProps = _.assign({ }, element.props)

    resolveChildren(mockComponent(), newProps, {
      _resolveStyles: resolveStyles
    })

    expect(newProps.children).to.eql('3')
  })

  it('should flatten the children', () => {
    const element = <div>
                      {[ 3, 4, [ 5, 6 ] ]}
                    </div>

    const newProps = _.assign({ }, element.props)
    resolveChildren(mockComponent(), newProps, {
      _resolveStyles: resolveStyles
    })

    expect(newProps.children).to.eql([ 3, 4, 5, 6 ])
  })
})

describe('Validating look enhanced Components', () => {
  it('should return true if element is enhanced with Look', () => {
    class Comp extends Component {
      render() {
        return 'foo'
      }
    }

    Comp = look(Comp)
    expect(isLookEnhanced(<Comp />)).to.eql(true)
  })
})


describe('Resolving props', () => {
  it('should resolve props containg elements', () => {
    const newProps = { }
    newProps.inner = <div></div>

    resolveProps(mockComponent(), newProps, {
      _resolveStyles: resolveStyles
    })
    expect(newProps._lookShouldUpdate).to.eql(true)
  })
})

describe('Resolving plugins', () => {
  it('should iterate every plugin', () => {

    const pluginInterface = {
      config: {
        plugins: [
          int => {
            int.styles.resolved = true
            return int.styles
          }
        ]
      },
      styles: {
        color: 'blue'
      }
    }

    const resolved = resolvePlugins(pluginInterface)
    expect(resolved.color).to.eql('blue')
    expect(resolved.resolved).to.eql(true)
  })
})
