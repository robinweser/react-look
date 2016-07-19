import { Component, PropTypes } from 'react'
import _ from 'lodash'

import resolveStyles from '../core/resolver'

const contextType = { _lookConfig: PropTypes.object }

/**
 * Root wrapper that wraps your whole application
 * It passes down the Look config to every child via context
 */
export default class LookRoot extends Component {
  static childContextTypes = contextType;
  static contextTypes = contextType;

  getChildContext() {
    return {
      _lookConfig: _.merge({ }, this.props.config, {
        _resolveStyles: resolveStyles
      })
    }
  }

  render() {
    return this.props.children
  }
}
