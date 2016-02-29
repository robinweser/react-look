import React, { Component, View } from 'react-native'
import look, { StyleSheet } from 'react-look-native'
const c = StyleSheet.combineStyles

class Container extends Component {
  render() {
    return (
      <View style={c(styles.container, styles.center)}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: props => {
    if (props.center) {
      return { justifyContent: 'center', alignItems: 'center' }
    }
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingTop: 22,
    alignSelf: 'stretch',
    borderWidth: 1,
    flexDirection: props => props.direction || 'column',
    'noPadding=true': {
      padding: 0
    },
    'noBorder=true': {
      borderWidth: 0
    }
  }
})

export default look(Container)
