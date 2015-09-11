import React from 'react';
import Look from '../../lib/dom/index';

class ChildIndex extends React.Component {
  constructor() {
    super(...arguments);
  }

  look() {
    return {
      listItem: {
        color: 'darkgray',
        listStyleType: 'none',
        ':nth-child(odd)': {
          backgroundColor: 'lightGray',
          color: 'blue'
        },
        ':last-child': {
          color: 'red'
        },
        ':first-child': {
          color: 'yellow'
        },
        ':nth-of-type(3)': {
          backgroundColor: 'rgba(30, 50, 60, 0.6)'
        },
        ':nth-of-type(3n+5)'  :{
          backgroundColor:'rgba(141, 195, 131, 0.4)'
        }
      }
    }
  }

  render() {
    //create a small list of items to demonstrate nth-child, et cetera
    var listItems = [];
    var i;

    for (i = 1; i <= this.props.items; ++i) {
      listItems.push('List Item ' + i);
    }

    var list = listItems.map(text => {
      return (
        <li look="listItem">{text}</li>
      )
    });

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
ChildIndex.defaultProps = {
  items: 10
}
export default Look(ChildIndex);