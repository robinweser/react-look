import React, {Component} from 'react'
import Look from '../../lib/dom'

@Look
export default class Input extends Component {
  styles = {
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
    }
  }

  render() {
    return (
      <div>
        <input key="i1" look="input inputFocus" placeholder="focus me"/>
        <input look="input" placeholder="i am required" required/>
        <input look="input inputOptional" placeholder="i am optional"/>
        <input look="input readOnly" placeholder="i am read only" readOnly/>
        <input disabled look="input inputDisabled" placeholder="i am disabled"/>
      </div>
    )
  }
}
