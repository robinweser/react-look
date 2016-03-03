export default {
  mockResolver(config, resolveSpy) {
    return (Component, element, config) => {
      resolveSpy()
      return element
    }
  },

  mockPlugin(pluginSpy) {
    return ({ styles }) => {
      pluginSpy()
      return styles
    }
  },

  mockConfigWithResolver(config, resolveSpy) {
    return {
      ...config,
      _resolveStyles: this.mockResolver(config, resolveSpy)
    }
  },

  mockConfigWithPlugin(pluginSpy) {
    return { plugins: [ this.mockPlugin(pluginSpy) ] }
  },

  mockPluginInterfaceWithPlugin(styles, pluginSpy) {
    return {
      styles: styles,
      config: this.mockConfigWithPlugin(pluginSpy)
    }
  },

  mockPluginInterfaceWithConfig(styles, config) {
    const resolve = config._resolveStyles
    return { styles: styles, config: config, resolve: resolve }
  },

  mockMixinInterface(property, value, mixinKey, newProps) {
    return {
      property: property,
      value: value,
      mixinKey: mixinKey,
      newProps: newProps
    }
  },

  mockPluginInterfaceWithComponentElementNewProps(styles) {
    return {
      styles: styles,
      Component: {
        constructor: {
          displayName: 'Comp'
        }
      },
      element: {
        type: 'div',
        key: null,
        ref: null
      },
      newProps: {},
      config: {}
    }
  }
}
