import React, { Component } from 'react'
import look, { StyleSheet } from '../../../lib/look'

class Container extends Component {
  render() {
    return (
      <div {...styles.container}>
        <h1 {...styles.title}>{this.props.title}</h1>
      <pre {...styles.desc}>{this.props.description}</pre>
    <div {...styles.inner}>
          {this.props.children}
        </div>
      </div>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 70,
    'group=true': {
      paddingTop: 50,
      margin: '0 auto',
      maxWidth: 900,
      minWidth: 500,
      borderBottom: '1px solid lightgray'
    }
  },
  inner: {
    padding: 10,
    border: '1px solid lightgray',
    'noPadding=true': {
      padding: 0
    },
    'group=true': {
      border: 'none',
      paddingTop: 0
    }
  },

  title: {
    fontSize: 25,
    color: 'rgb(85, 85, 85)',
    padding: 5,
    paddingBottom: 0,
    margin: 0,
    lineHeight: 1,
    fontWeight: 300,
    'group=true': {
      fontWeight: 400,
      fontSize: 30,
      padding: 8,
      color: 'rgb(102, 79, 196)'
    }
  },

  desc: {
    padding: 5,
    paddingTop: 0,
    lineHeight: 1,
    color: 'gray',
    fontSize: 15
  }
})

export default look(Container)
