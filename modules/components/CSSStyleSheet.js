import React, { Component } from 'react'
import CSSContainer from '../utils/CSSContainer'

export default class CSSStyleSheet extends Component {
  constructor(props) {
    super(...arguments)
    const css = CSSContainer.render(props.userAgent) // eslint-disable-line
    this.state = { css: css }

    this.updateStyleSheet = this.updateStyleSheet.bind(this, props.userAgent)
  }

  componentDidMount() {
    this._changeListener = CSSContainer.subscribe(this.updateStyleSheet)
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateStyleSheet(userAgent) {
    const css = CSSContainer.render(userAgent) // eslint-disable-line
    this.setState({ css: css })
  }

  render() {
    console.log('CSSSheet rendered')
    return (<style dangerouslySetInnerHTML={{
        __html: this.state.css
      }} />)

  }
}
