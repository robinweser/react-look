import React, {Component} from 'react'
import Look, {StyleSheet} from '../../lib/dom'

@Look
export default class Input extends Component {

  render() {
    return (
      <div>
        <input key="i1" look={[styles.input, styles.inputFocus]} placeholder="focus me"/>
        <input look={styles.input} placeholder="i am required" required/>
        <input look={styles.input} placeholder="i have pattern" pattern="[A-Z]" ref="valid"/>
        <input look={[styles.input, styles.inputOptional]} placeholder="i am optional"/>
        <input look={[styles.input, styles.readOnly]} placeholder="i am read only" readOnly/>
        <input disabled look={[styles.input, styles.inputDisabled]} placeholder="i am disabled"/>
        <input ref="email" type="email" look={styles.input} placeholder="i am an email"/>
        <input ref="email-multiple" type="email" multiple look={styles.input} placeholder="i am multiple emails"/>
        <input ref="url" type="url" look={styles.input} placeholder="i am an url"/>
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
    },
    ':valid': {
      backgroundColor: 'green'
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
  }})
