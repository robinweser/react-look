import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules/look'
const c = StyleSheet.combineStyles

const iOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/538.34.9 (KHTML, like Gecko) Mobile/12A4265u'
const android = 'Mozilla/5.0 (Linux; Android 4.4; Nexus 7 Build/KOT24) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.105 Safari/537.36'


class Platform extends Component {
  constructor() {
    super(...arguments)
    this.state = { userAgent: false, ios: false, android: false }
  }

  onClick(userAgent) {
    if (this.state.userAgent !== userAgent) {
      if (userAgent === iOS) {
        this.setState({
          userAgent: userAgent,
          ios: true,
          android: false
        })
      } else {
        this.setState({
          userAgent: userAgent,
          android: true,
          ios: false
        })
      }
    } else {
      this.setState({
        userAgent: navigator.userAgent,
        ios: false,
        android: false
      })
    }
  }

  render() {
    const config = this.state.userAgent ? {
      userAgent: this.state.userAgent
    } : { }
    return (
      <div className={styles.container} lookConfig={config}>
        <div>
          <div className={ c(styles.button, styles.ios)} onClick={this.onClick.bind(this, iOS)}>iOS userAgent</div>
          <div className={ c(styles.button, styles.android)} onClick={this.onClick.bind(this, android)}>Android userAgent</div>
        </div>
        <div className={styles.platform}>
          <span>On iOS I am blue</span>
          <span>On android I am red</span>
          <span>On others I am gray</span>
        </div>
      </div>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex'
  },
  button: {
    display: 'flex',
    flex: 1,
    alignSelf: 'Stretch',
    margin: 10,
    padding: 10,
    fontSize: 17,
    color: 'black',
    borderRadius: 5,
    textAlign: 'center',
    border: '1px solid lightgray',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.34)'
  },
  ios: {
    'ios=true': {
      backgroundColor: 'rgba(0,0, 255, 0.3)'
    }
  },
  android: {
    'android=true': {
      backgroundColor: 'rgba(255,0, 0, 0.3)'
    }
  },
  platform: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'gray',
    '@platform ios': {
      backgroundColor: 'blue'
    },
    '@platform android': {
      backgroundColor: 'red'
    }
  }
})

export default look(Platform)
