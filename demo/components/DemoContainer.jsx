import React, {Component} from 'react'
import Look, {StyleSheet} from '../../lib/dom'

class DemoContainer extends Component {
  static defaultProps = {
    padding: 10
  }

  render() {
    return (
      <div look={styles.container}>
        <h1 look={styles.title}>{this.props.title}</h1>
        <pre look={styles.desc}>{this.props.description}</pre>
        <div look={styles.inner}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create(DemoContainer, {
    container: {
      width: '100%',
      boxSizing: 'border-box',
      marginBottom: 50,
      'group=true': {
        padding: '10px 20% 0 20%',
        borderBottom: '1px solid lightgray'
      }
    },
    inner: {
      padding: (props) => props.padding,
      border: '1px solid lightgray',
      'group=true': {
        border: 'none',
        paddingTop: 0
      }

    },
    title: {
      fontSize: 25,
      color: 'rgb(85, 85, 85)',
      padding: 5,
      paddingBottom: 0,
      margin: 0,
      lineHeight: 1,
      fontWeight: 300,
      'group=true': {
        fontWeight: 400,
        fontSize: 30,
        padding: 8,
        color: 'rgb(102, 79, 196)'
      }
    },

    desc: {
      padding: 5,
      paddingTop: 0,
      lineHeight: 1,
      color: 'gray',
      fontSize: 15
    }
})

export default Look(DemoContainer)
