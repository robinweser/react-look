import React from 'react'
import { View, PropTypes } from 'react-native'
import resolveStyles from '../../core/native/resolver'
import _ from 'lodash'

const contextType = { _lookConfig: PropTypes.object }
/**
 * Root wrapper that wraps your whole application
 * It renders the global CSS styles and passes the config down
 */
export default class LookRoot extends React.Component {
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
