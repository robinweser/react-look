import _ from 'lodash'
import { Component, PropTypes } from 'react'

import Prefixer from './Prefixer'
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

  constructor(props) {
    super(...arguments)
    this.config = _.merge({ }, props.config, {
      _resolveStyles: resolveStyles
    })

    const { prefixer } = this.config
    if (!prefixer || !prefixer._isLookPrefixer) {
      this.config.prefixer = new Prefixer()
    }
  }

  getChildContext() {
    return { _lookConfig: this.config }
  }

  componentDidMount() {
    const { styleElementId, prefixer } = this.config
    new StyleComponent(styleElementId, prefixer).render()
  }

  render() {
    return this.props.children
  }
}


/**
 * StyleComponent is used to render static CSS markup
 * into a <style> element so CSS styles are rendered correctly
 * it listens for changes of the global style container
 */
class StyleComponent {
  constructor(styleElementId, prefixer) {
    this.styles = StyleContainer.renderStaticStyles(prefixer) // eslint-disable-line
    this.updateStyles = this.updateStyles.bind(this, prefixer)

    this._changeListener = StyleContainer.subscribe(this.updateStyles)
    this.el = this.createStyleElement(styleElementId)
  }

  createStyleElement(styleElementId = '_react-look-stylesheet') {
    let style = document.getElementById(styleElementId)
  
    if (!style) {
      style = document.createElement('style')
      style.id = styleElementId
      document.head.appendChild(style)
    }
  
    return style
  }

  updateStyles(prefixer) {
    const newStyles = StyleContainer.renderStaticStyles(prefixer)
    // only render if something changed
    if (this.styles !== newStyles) {
      this.styles = newStyles
      this.render()
    }
  }

  render() {
    if ('textContent' in this.el) {
      this.el.textContent = this.styles
    } else {
      this.el.innerText = this.styles
    }
  }
}
