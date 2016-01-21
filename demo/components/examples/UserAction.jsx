import React, { Component } from 'react'
import look, { State, StyleSheet } from '../../../lib/look'
const c = StyleSheet.combineStyles

class UserAction extends Component {
  render() {
    const states = { hover: 'Now click me', active: 'Well done' }
    let stateLabel = 'Hover me'

    Object.keys(states).forEach(state => {
      if (State.getState(state, this, 'both')) {
        stateLabel = states[state]
      }
    })

    return (
      <div>
        <div key="active" {...c(styles.button, styles.activeButton)}>Click me</div>
      <div key="hover" {... c(styles.button, styles.hoverButton)}>Hover me</div>
        <br/>
        <div>State-API live example</div>
      <div key="both" {... c(styles.button, styles.stateButton)}>{stateLabel}</div>
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
  stateButton: {
    ':hover': {
      backgroundColor: 'rgba(0, 255, 0, 0.3)'
    },
    ':active': {
      backgroundColor: 'rgba(0, 0,0, 0.3)'
    }
  }
})

export default look(UserAction)
