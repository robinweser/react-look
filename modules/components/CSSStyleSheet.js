import React, { Component } from 'react'
import CSSContainer from '../utils/CSSContainer'

export default class CSSStyleSheet extends Component {
  constructor(props) {
    super(...arguments)
    const css = CSSContainer.render(userAgent) // eslint-disable-line
    this.setState({styles: css})

    this.updateStyles = this.updateStyles.bind(this, props.userAgent)
  }

  componentDidMount() {
    this._changeListener = CSSContainer.subscribe(this.updateStyles)
    CSSContainer._executeListener()
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateStyles(userAgent) {
    const css = CSSContainer.render(userAgent) // eslint-disable-line
    this.setState({styles: css})
  }

  render() {
    if (this.state.css !== '') {
      return <style dangerouslySetInnerHTML={{
          __html: this.state.css
        }} />
    }
    return ''
  }
}
