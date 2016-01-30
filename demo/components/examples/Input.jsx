import React, { Component } from 'react'
import look, { StyleSheet, State } from '../../../modules/look'
const c = StyleSheet.combineStyles

class Input extends Component {
  render() {
    const rangePlaceholder = State.getState('valid', this, 'step').valid ? 'I am in range' : 'I am out of range'

    return (
      <div>
        <input key="i1" className={c(styles.input, styles.inputFocus)} placeholder="focus me"/>
      <input className={styles.input} placeholder="i am required" required/>
    <input className={c(styles.input, styles.inputValid)} placeholder="i only allow uppercase" pattern="[A-Z]*" ref="valid"/>
  <input className={c(styles.input, styles.inputOptional)} placeholder="i am optional"/>
<input className={c(styles.input, styles.range)} type="number" placeholder={rangePlaceholder} min={10} max={100} defaultValue={120} step={1} ref="step"/>
        <input className={c(styles.input, styles.readOnly)} defaultValue="i am read only" readOnly/>
      <input disabled className={c(styles.input, styles.inputDisabled)} placeholder="i am disabled"/>
      </div>
      )
  }
}

const styles = StyleSheet.create({
  input: {
    appearance: 'none',
    outline: 'none',
    width: 'calc(100% - 20px)',
    fontSize: 18,
    margin: '5px 10px',
    padding: '5px 5px 5px 8px',
    border: '1px solid gray',
    borderRadius: 5,
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
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.3)'
    },
    ':invalid': {
      borderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.3)'
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

export default look(Input)
