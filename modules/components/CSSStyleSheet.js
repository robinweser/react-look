import React, { Component } from 'react'
import StyleContainer from '../utils/StyleContainer'

export default class CSSStyleSheet extends Component {
  constructor(props) {
    super(...arguments)
    const css = StyleContainer.renderStaticStyles(props.userAgent) // eslint-disable-line
    this.state = { css: css }

    this.updateStyles = this.updateStyles.bind(this, props.userAgent)
  }

  componentDidMount() {
    this._changeListener = StyleContainer.subscribe(this.updateStyles)
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateStyles(userAgent) {
    const css = StyleContainer.renderStaticStyles(userAgent) // eslint-disable-line
    this.setState({ css: css })
  }

  render() {
    return <style dangerouslySetInnerHTML={{
        __html: this.state.css
      }} />

  }
}
