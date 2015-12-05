import React, { Component } from 'react'
import GlobalStyleSheet from '../utils/GlobalStyleSheet'

export default class CSSStyleSheet extends Component {
  constructor(props) {
    super(...arguments)
    const CSSString = GlobalStyleSheet.getCSSString(props.userAgent) //eslint-disable-line
    this.state = {CSSString: CSSString}
  }

  componentDidMount() {
    this._changeListener = GlobalStyleSheet.subscribe(this.updateCSSString)
    GlobalStyleSheet._executeListener()
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateCSSString = () => {
    const CSSString = GlobalStyleSheet.getCSSString(this.props.userAgent) //eslint-disable-line
    this.setState({CSSString: CSSString})
  }

  render() {
    return (
      <style dangerouslySetInnerHTML={{
        __html: this.state.CSSString
      }} />
    )
  }
}
