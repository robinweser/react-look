import React from 'react';
import Look from '../src/index';

class Media extends React.Component {
  constructor() {
    super(...arguments);
  }

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
export default Look(Media);