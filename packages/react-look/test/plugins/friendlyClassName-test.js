import React, { Component } from 'react'

import friendlyClassName from '../../modules/plugins/friendlyClassName'
import StyleSheet from '../../modules/api/StyleSheet'
import StyleContainer from '../../modules/api/StyleContainer'

describe('Transforming classNames to friendly class names', () => {
  it('should use the className-Component-element pattern', () => {

    const styles = StyleSheet.create({
      box: {
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      }
    })
    const Component = { constructor: { displayName: 'Comp' } }
    const element = <div></div>
    const newProps = { className: styles.box }
    const pluginInterface = {
      StyleContainer,
      Component,
      element,
      newProps,
      config: {}
      styles: {}
    }

    friendlyClassName(pluginInterface)
    expect(newProps.className).to.eql('Comp-div--' + styles.box)
  })

  it('should use a custom template if one is provided in the config', () => {
    const styles = StyleSheet.create({
      container: {},
      box: {
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      }
    })
    const Component = { constructor: { displayName: 'Comp' } }
    const element = <div></div>
    const newProps = { className: styles.box }
    const config = {
      friendlyClassNameTemplate: (cls, Component, element) => {
       return Component.constructor.displayName + '-custom-' + 'div' + '--custom--' + cls
      }
    }
    const pluginInterface = {
      StyleContainer,
      Component,
      config,
      element,
      newProps,
      styles: {}
    }

    friendlyClassName(pluginInterface)
    expect(newProps.className).to.eql('Comp-custom-div--custom--' + styles.box)

  })
})
