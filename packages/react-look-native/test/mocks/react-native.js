import React, { Component, createElement } from "react";

const RN = React;

export const PropTypes = React.PropTypes;

const createComponent = (type) => {
  return React.createClass({
    displayName: type,
    propTypes: {
      children: React.PropTypes.node
    },
    render() {
      return <div {...this.props}>{this.props.children}</div>
    }
  })
};

RN.View = createComponent("View");
RN.Text = createComponent("Text");

export default RN;
export {
  Component,
  createElement
}
