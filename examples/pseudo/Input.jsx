import React, { Component } from 'react'
import Look, { StyleSheet } from '../../lib/dom'

class Input extends Component {

  render() {
    return (
      <div>
        <input key="i1" look={[styles.input, styles.inputFocus]} placeholder="focus me"/>
        <input look={styles.input} placeholder="i am required" required/>
      <input look={[styles.input, styles.inputValid]} placeholder="i only allow uppercase" pattern="[A-Z]*" ref="valid"/>
        <input look={[styles.input, styles.inputOptional]} placeholder="i am optional"/>
      <input look={[styles.input, styles.range]} type="number" placeholder="i have a range" min={10} max={100} defaultValue={120} step={1} ref="step"/>
        <input look={[styles.input, styles.readOnly]} placeholder="i am read only" readOnly/>
        <input disabled look={[styles.input, styles.inputDisabled]} placeholder="i am disabled"/>
      </div>
      )
  }
}

const styles = StyleSheet.create(Input, {
  input: {
    appearance: 'none',
    outline: 'none',
    width: '100%',
    padding: 3,
    fontSize: 18,
    border: '1px solid gray',
    borderRadius: 5,
    marginBottom: 5,
    userSelect: 'text',
    ':required': {
      border: '2px solid black'
    }
  },
  range: {
    appearance: 'none',
    outline: 'none',
    border: '2px solid gray',
    ':in-range': {
      borderColor: 'green'
    },
    ':out-of-range': {
      borderColor: 'red'
    }
  },
  inputValid: {
    border: '2px solid gray',
    ':valid': {
      borderColor: 'green'
    },
    ':invalid': {
      borderColor: 'red'
    }
  },
  inputFocus: {
    ':focus': {
      borderColor: 'red',
      backgroundColor: 'lightblue'
    }
  },
  inputOptional: {
    ':optional': {
      border: '1px dotted lightgray'
    }
  },
  inputDisabled: {
    ':disabled': {
      backgroundColor: 'gray'
    }
  },
  readOnly: {
    ':read-only': {
      backgroundColor: 'lightgray'
    }
  }
})

export default Look(Input)
