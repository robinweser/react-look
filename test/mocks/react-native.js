import React, { Component, createElement, cloneElement, PropTypes } from "react"

class View extends Component {
  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}

class Text extends Component {
  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}

export default React
export {
  Component,
  createElement,
  cloneElement,
  PropTypes
}
