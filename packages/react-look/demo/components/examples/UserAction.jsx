import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules'
const c = StyleSheet.combineStyles

class UserAction extends Component {
  render() {
    return (
      <div>
        <div key="active" className={c(styles.button, styles.activeButton)}>Click me</div>
        <div key="hover" className={ c(styles.button, styles.hoverButton)}>Hover me</div>
        <div key="both" className={ c(styles.button, styles.hoverActiveButton)}>Hover me, then Click me</div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 5,
    fontSize: 20,
    color: 'black',
    borderRadius: 5,
    textAlign: 'center',
    border: '1px solid lightgray',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.34)'
  },
  hoverButton: {
    ':hover': {
      backgroundColor: 'rgba(0, 0, 255, 0.3)'
    }
  },
  activeButton: {
    ':active': {
      backgroundColor: 'rgba(255, 0, 0, 0.3)'
    }
  },
  hoverActiveButton: {
    ':hover': {
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
      ':active': {
        backgroundColor: 'rgba(0, 0,0, 0.3)'
      }
    }
  }
})

export default look(UserAction)
