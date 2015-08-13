import React from 'react';
import Look, {State} from '../../src/index';
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
      },

      range: {
          userSelect: 'text',
        marginBottom: 5,
        borderRadius: 5,
        appearance: 'none',
        ':in-range': {
          backgroundColor: 'red'
        },
        ':out-of-range': {
          backgroundColor: 'blue'
        }
      },

      validMail: {
        borderWidth: 2,
        transition: '200ms all linear',
        ':valid': {
          borderColor: 'green',
          backgroundColor: 'rgba(80, 152, 80, 0.37)'
        },
        ':invalid': {
          borderColor: 'red'
        }
      }
    }
  }

  processors() {
    return Processors.Prefixer;
  }

  render() {
    let r1Value = State.getState('change', this, 'r1') || 10;
    let r2Value = State.getState('change', this, 'r2') || 120;

    return (
      <div>
        <input  key="i1" look="input inputFocus" placeholder="focus me"/>
        <input look="input" placeholder="i am required" required/>
        <input  look="input inputOptional" placeholder="i am optional"/>
        <input look="input readOnly" placeholder="i am read only" readOnly/>
      <input look="input inputDisabled" placeholder="i am disabled" disabled/>
      
        <br/>
        <input  defaultValue="10" key="r1" look="range" max="100" min="1" type="range"/>
        in-range: {r1Value}<br/>
        <input  defaultValue="120" key="r2" look="range" max="100" min="1" type="range"/>
          {r2Value <= 100 ? 'in-range:' : 'out-of-range:'}{r2Value}
        <br/>
      <input key="email" look="input validMail" type="email" placeholder="type a mail to see validation"></input>
      </div>
    )
  }
}
export default Look(Input);