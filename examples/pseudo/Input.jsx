import React, {Component} from 'react';
import Look, {StyleSheet} from '../../lib/dom';

@Look
export default class Input extends Component {
  
  render() {
    return (
      <div>
        <input key="i1" look={[styles.input, styles.inputFocus]} placeholder="focus me"/>
      <input look={styles.input} placeholder="i am required" required/>
    <input look={[styles.input, styles.inputOptional]} placeholder="i am optional"/>
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
