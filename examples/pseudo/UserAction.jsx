import React from 'react';
import Look, {State} from '../../src/index';

class UserAction extends React.Component {
  constructor() {
    super(...arguments);
  }

  look() {
    return {
      button: {
        margin: 10,
        padding: 5,
        border: '1px solid black'
      },

      hoverButton: {
        backroundColor: 'blue',
        fontSize: 20,
        color: 'black',
        transition: '300ms all linear',
        ':hover': {
          backgroundColor: 'darkblue',
          color: 'white'
        },
        ':active': {
          backgroundColor: 'red'
        }
      },

      activeButton: {
        fontSize: 30,
        ':active': {
          backgroundColor: 'red'
        }
      }
    }
  }

  render() {
		let defaultState = 'Hover me!';
    let hoverState = State.getState('hover', this, 'b3') ? ' Now click me! ' : '';
    let activeState = State.getState('active', this, 'b3') ? ' Well Done. ' : '';
		
		let text = activeState || hoverState || defaultState;
    return (
      <div>
        <div key="b1" look="button activeButton">Click me!</div>
      <div key="b2" look="button hoverButton">Hover me!</div>
        <br/>
        <div>State-API live example</div>
			<div key="b3" look="button hoverButton">{text}</div>
      </div>
    )
  }
}
export default Look(UserAction);