import React from 'react';
import Look from '../src/index';
import {Processors} from 'dynamic-style-sheets';

let styles = {
  button: {
    margin: 10,
    padding: 5,
    border: '1px solid black',
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
    },
    'bla=undefined': {
      hallo: 2
    }
  },
  
  activeButton: {
    fontSize: 30,
    ':active': {
      backgroundColor: 'red'
    }
  },
  
  listItem: {
    color: 'darkgray',
    ':nth-child(odd)': {
      backgroundColor: 'lightGray',
      color: 'blue'
    },
    ':last-child': {
      color: 'red'
    }
  }
}
class Pseudo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    //create a small list of items to demonstrate nth-child, et cetera
    let list = this.props.items.map(listitem => {
      return (
        <li look="listItem">ListItem {listitem}</li>
      )
    });
    return (
      <div>
        <div key="hover" look="button hoverButton">Hover me!</div>
        <div key="active" look="button activeButton">Click me!</div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
Pseudo.defaultProps = {
  bla: undefined,
  items: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]
}
export default Look(Pseudo, styles, Processors.Prefixer);