import React from 'react';
import Look, {State} from '../../src/dom/index';
import {Processors} from 'dynamic-style-sheets';

class Input extends React.Component {
  constructor() {
    super(...arguments);
  }

  look() {
    return {
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
      inputDisabled : {
        ':disabled' : {
          backgroundColor: 'gray'
        }
      },
      
      readOnly: {
        ':read-only': {
          backgroundColor: 'lightgray'
        }
      }
    }
  }


  render() {
    return (
      <div>
        <input  key="i1" look="input inputFocus" placeholder="focus me"/>
        <input look="input" placeholder="i am required" required/>
        <input  look="input inputOptional" placeholder="i am optional"/>
        <input look="input readOnly" placeholder="i am read only" readOnly/>
      <input look="input inputDisabled" placeholder="i am disabled" disabled/>
  </div>
    )
  }
}
export default Look(Input);