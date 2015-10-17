import React, {Component, PropTypes} from 'react'
import Look from '../../lib/dom'

@Look
export default class ChildIndex extends Component {
  static defaultProps = {
    items: [1,2,3,4,5,6,7,8,9,10]
  }

  static propTypes = {
    items: PropTypes.array.isRequired
  }

  styles() {
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
    let list = this.props.items.map((text,index) => {
      return <li look="listItem" key={'list' + index}>ListItem {text}</li>
    })

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
