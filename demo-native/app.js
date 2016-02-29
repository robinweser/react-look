import React, { Component, View, Text } from 'react-native'
import look, { StyleSheet, LookRoot, Presets } from 'react-look-native'
import Container from './components/layout/Container'

class Main extends Component {
  render() {
    return (
      <Container noBorder>
        <View style={styles.banner}>
          <Text style={styles.header}>Look Native Example!</Text>
        </View>
        <Container center>
          <Text style={styles.inner}>I am da fucking inner text</Text>
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    paddingBottom: 20,
    flexDirection: 'row'
  },
  header: {
    fontSize: 20,
    color: 'purple'
  },
  inner: {
    flex: 1
  }
})

Main = look(Main)

export default class App extends Component {
  render() {
    return (
      <LookRoot config={Presets['react-native']}>
        <Main />
      </LookRoot>
    )
  }
}
