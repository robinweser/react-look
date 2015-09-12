import React, {Component} from 'react';
import Look from '../lib/dom/index';

@Look
export default class Media extends Component {
  look() {
    return {
      padding: 40,
      backgroundColor: 'red',
      '@media (max-width: 500px)': {
        backgroundColor: 'blue'
      },
      '@media (orientation:landscape)': {
        backgroundColor: 'orange'
      },
      '@media (min-width: 1000px)': {
        backgroundColor: 'green'
      }
    }
  }

  render() {
    return (
      <div look>
        Resize Me!
      </div>
    )
  }
}