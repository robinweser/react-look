import React, { Component } from 'react'
import GlobalStyleSheet from '../utils/GlobalStyleSheet'

export default class CSSStyleSheet extends Component {
  constructor() {
    super(...arguments)
    this.state = {CSSString: GlobalStyleSheet.getCSSString()}
  }

  componentDidMount() {
    this._changeListener = GlobalStyleSheet.subscribe(this.updateCSSString)
    GlobalStyleSheet._executeListener()
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateCSSString = (CSSString) => {
    this.setState({CSSString: CSSString})
  }

  render() {
    return <style dangerouslySetInnerHTML={{
        __html: this.state.CSSString
      }} />
  }
}
