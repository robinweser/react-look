import copyProperties from '../utils/copyProperties'
import { PropTypes } from 'react'
import _ from 'lodash'

const contextType = { _lookConfig: PropTypes.object }
/**
 * Wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Object} config - additional processors that modify the styles
 */
export default (CustomComponent, config = { }) => {
  // Enhancing stateless functional Components
  // Depending on availability of setState
  if (!CustomComponent.prototype.setState) {
    const LookStateless = (props, context) => {
      const renderedElement = CustomComponent(props, context)
      const contextConfig = context._lookConfig || null
      const elementConfig = renderedElement.props.lookConfig || null
      // Compose all possible ways to configure Look
      const composedConfig = _.merge({ }, contextConfig, config, elementConfig)
      // Mocking the Component to use the same consistent interface
      // for all plugins, mixins and to improve developer experience
      const Component = { props, context }
      // Passing the displayName to improve developer experience
      Component.constructor = {
        displayName: CustomComponent.name || 'Component'
      }
      return context._lookConfig._resolveStyles(Component, renderedElement, composedConfig)
    }
    // Transfer static props of stateless components:
    copyProperties(CustomComponent, LookStateless)

    // Passing contextTypes to be able to reference context
    LookStateless.contextTypes = _.merge({ }, CustomComponent.contextTypes, contextType)

    // Flag as Look-enhanced Component
    LookStateless._isLookEnhanced = true
    return LookStateless
  }

  // Enhancing ES2015 classes
  // This will let you use state and do some render optimizations
  class LookComponent extends CustomComponent {
    constructor() {
      super(...arguments)
    }

    // Inherit the original displayName for proper use later on
    static displayName = CustomComponent.displayName || CustomComponent.name || 'Component';
    static childContextTypes = { ...CustomComponent.childContextTypes, ...contextType };
    static contextTypes = { ...CustomComponent.contextTypes, ...contextType };
    static _isLookEnhanced = true;

    render() {
      const renderedElement = super.render() // eslint-disable-line
      const contextConfig = this.context._lookConfig || null
      const elementConfig = renderedElement.props.lookConfig || null
      // Compose all possible ways to configure Look
      const composedConfig = _.merge({ }, contextConfig, config, elementConfig)
      return this.context._lookConfig._resolveStyles(this, renderedElement, composedConfig)
    }
  }

  // copy props in order to get hmr working correctly
  if (process.env.NODE_ENV !== 'production') {
    copyProperties(CustomComponent.prototype, LookComponent.prototype)
  }

  return LookComponent
}
