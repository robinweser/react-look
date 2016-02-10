import React, { Component, PropTypes } from 'react'
import StyleContainer from './StyleContainer'

const contextType = { _lookConfig: PropTypes.object }
/**
 * Root wrapper that wraps your whole application
 * It renders the global CSS styles and passes the config down
 */
export default class LookRoot extends Component {
  static childContextTypes = contextType;
  static contextTypes = contextType;
  static defaultProps = {
    config: {}
  };

  getChildContext() {
    return { _lookConfig: this.props.config }
  }

  render() {
    const { config, ...otherProps } = this.props

    return (
      <div {...otherProps}>
        {this.props.children}
        <StyleComponent userAgent={config.userAgent} />
      </div>
    )
  }
}


/**
 * StyleComponent is used to render static CSS markup
 * into a <style> element so CSS styles are rendered correctly
 * it listens for changes of the global style container
 */
class StyleComponent extends Component {
  constructor(props) {
    super(...arguments)
    const css = StyleContainer.renderStaticStyles(props.userAgent) // eslint-disable-line
    this.state = { css: css }

    this.updateStyles = this.updateStyles.bind(this, props.userAgent)
  }

  componentDidMount() {
    this._isMounted = true
    this._changeListener = StyleContainer.subscribe(this.updateStyles)
  }

  componentWillUnmount() {
    this._isMounted = false
    this._changeListener.unsubscribe()
  }

  updateStyles(userAgent) {
    const css = StyleContainer.renderStaticStyles(userAgent) // eslint-disable-line
    // Delay change listener until Component is mounted
    setTimeout(() => this._isMounted && this.setState({ css: css }), 0)
  }

  render() {
    const innerHTML = { __html: this.state.css }
    return <style dangerouslySetInnerHTML={innerHTML} />
  }
}
