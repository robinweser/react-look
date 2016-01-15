import React, { Component } from 'react'
import look, { StyleSheet } from '../../../lib/look'
import Color from 'color'

class Condition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'default',
      clicks: 0
    }
  }

  onClick(){
    const mode = this.state.mode

    if (mode === 'important') {
      this.setState({mode: 'disabled'})
    } else if (mode === 'disabled') {
      this.setState({mode: 'default'})
    } else if (mode === 'active') {
      this.setState({mode: 'important'})
    } else {
      this.setState({mode: 'active'})
    }
  }

  onClicksCount() {
    this.setState({
      clicks: ++this.state.clicks
    })
  }

  render () {
    const getText = (clicks) => {
      if(clicks < 20) {
        return 'Click me ' + (20 - clicks) + ' times'
      } else if (clicks === 20) {return 'HORRAAAY!'} else {
        return 'Alright stop it. ' + clicks + ' clicks'
      }
    }

    return (
      <div>
        <div look={styles.states} onClick={this.onClick.bind(this)}>Click me<br /> Active state: {this.state.mode}</div>
        <div look={styles.clicks} onClick={this.onClicksCount.bind(this)}>{getText(this.state.clicks)}</div>
      </div>
    )
  }
}

const buttonStyles = {
  margin: 10,
  padding: 5,
  fontSize: 20,
  border: '1px solid black',
  color: 'black',
  borderRadius: 5,
  textAlign: 'center',
  border: '1px solid lightgray',
  boxShadow: '0px 1px 2px rgba(0,0,0,0.34)'
}
const styles = StyleSheet.create(Condition, {
  states: {
    ...buttonStyles,
    'mode=important': {
      backgroundColor: 'rgba(182, 49, 40, 0.66)'
    },
    'mode=disabled': {
      backgroundColor: 'rgba(133, 133, 133, 0.58)'
    },
    'mode=active': {
      backgroundColor: 'rgba(86, 150, 177, 0.81)'
    },
    'mode=default': {
      backgroundColor: 'transparent'
    }
  },

  clicks: {
    ...buttonStyles,
    'clicks<20': {
      backgroundColor: (props, state) => Color('green').alpha((state.clicks + 1) / 20).rgbString()
    },
    'clicks=20': {
      backgroundColor: 'green'
    },
    'clicks>20': {
      backgroundColor: 'red'
    }
  }
})

export default look(Condition)
