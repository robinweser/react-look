import _ from 'lodash'
import { Component, PropTypes } from 'react'

import StyleContainer from './StyleContainer'
import resolveStyles from '../core/resolver'

const contextType = { _lookConfig: PropTypes.object }
/**
 * Root wrapper that wraps your whole application
 * It renders the global CSS styles and passes the config down
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

  componentDidMount() {
    const { config } = this.props
    this.styleContainer = new StyleComponent(config.userAgent, config.styleElementId)
    this.styleContainer.render()
  }

  render() {
    const { config, ...otherProps } = this.props

    return this.props.children
  }
}


/**
 * StyleComponent is used to render static CSS markup
 * into a <style> element so CSS styles are rendered correctly
 * it listens for changes of the global style container
 */
class StyleComponent {
  constructor(userAgent, styleElementId) {
    this.styles = StyleContainer.renderStaticStyles(userAgent) // eslint-disable-line
    this.updateStyles = this.updateStyles.bind(this, userAgent)

    this._changeListener = StyleContainer.subscribe(this.updateStyles)
    this.el = this.createStyleElement(styleElementId)
  }

  createStyleElement(styleElementId) {
    // if a custom style element is provided
    // we can use that one instead of creating our own
    if (styleElementId) {
      return document.getElementById(styleElementId)
    }

    const style = document.createElement('style')
    style.id = '_react-look-stylesheet'
    document.head.appendChild(style)

    return style
  }

  updateStyles(userAgent) {
    const newStyles = StyleContainer.renderStaticStyles(userAgent)
    // only render if something changed
    if (this.styles !== newStyles) {
      this.styles = newStyles
      this.render()
    }
  }

  render() {
    this.el.innerHTML = this.styles
  }
}
