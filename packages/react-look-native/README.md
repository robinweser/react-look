<p align="center"><img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/logo.png" width=320></p>
<p align="center">
Advanced & Dynamic Component Styling for  [React Native](https://facebook.github.io/react-native/).
<br>
![npm version](https://badge.fury.io/js/react-look-native.svg)
![react version](https://img.shields.io/badge/react--native-%5E0.18.0-brightgreen.svg)
</p>
<p align="center">
Also available for [React](../react-look/).
</p>

# Features
- ES2015 Classes & `React.createClass`
- stateless Components
- [plugin-based](docs/Plugins.md)
- [developer tools](docs/Plugins.md#developertools)
- Sass-like nesting
- [conditioned styles](docs/Mixins.md#stateful-conditions)
- [stateful values](docs/plugins/StatefulValue.md) & [selectors](docs/plugins/StatefulSelector.md)
- [extending](docs/Mixins.md#extend)

# [Documentation](docs/Docs.md)
The documentation contains information on every part of Look including usage guides and API reference.

**New to Look?**<br>
Make sure to check out the the Getting Started guide which provides a full guide on how to use Look. From installation, over configuration and up to even developer tooling.


1. [Getting Started](docs/GettingStarted.md)
	* 1.1. [Installation](docs/GettingStarted.md#1-installation)
	* 1.2. [First Component](docs/GettingStarted.md#2-first-component)
	* 1.3. [Stateless Components](docs/GettingStarted.md#3-stateless-components)
	* 1.4. [Mixins & Plugins](docs/GettingStarted.md#4-mixins--plugins)
	* 1.5. [DevTools](docs/GettingStarted.md#5-devtools)
2. [API Reference](docs/api/)
	* **2.1. [look](docs/api/Look.md)**
	* **2.2. [StyleSheet](docs/api/StyleSheet.md)**
		* [create](docs/api/StyleSheet.md#createstyles)
		* [combineStyles](docs/api/StyleSheet.md#combinestylesstyles)
	* **2.3. [LookRoot](docs/api/LookRoot.md)**
3. Registry
  * **3.1. [Plugins](Plugins.md)**
    * [Mixin](docs/plugins/Mixin.md)
    * [Stateful Value](docs/plugins/StatefulValue.md)
    * [Stateful Selector](docs/plugins/StatefulSelector.md)
    * **3.1.1 [DevTools](docs/Plugins.md#developertools)**
      * [Style Logger](docs/plugins/StyleLogger.md)
  * **3.2 [Mixins](docs/Mixins.md)**
      * [Before / After](docs/Mixins.md#before-after)
      * [Blank](docs/Mixins.md#blank)
      * [Contains](docs/Mixins.md#contains)
      * [Empty](docs/Mixins.md#empty)
      * [Extend](docs/Mixins.md#extend)
      * [First Letter](docs/Mixins.md#first-letter)
      * [Stateful Conditions](docs/Mixins.md#stateful-conditions)
      * [Substr](docs/Mixins.md#substr)
4. [Guides](docs/guides/)
	* 4.1. [Upgrading Look](docs/guides/upgradeLook.md)
	* 4.2. [Configuring Look](docs/guides/configureLook.md)
	* 4.3. [Build your own: Mixin](docs/guides/customMixin.md)
	* 4.4. [Build your own: Plugin](docs/guides/customPlugin.md)
5. [FAQ](docs/FAQ.md)

# Example
The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries.

```sh
npm install react-look-native --save
```
```javascript
import React, { View, Text, Component, PropTypes } from 'react-native'
import look, { StyleSheet } from 'react-look-native'

class Header extends Component {
  static defaultProps = { size: 24 };
  static propTypes = { size: PropTypes.number.isRequired };
  state = { status: 'active' };

  render() {
    return (
      // Styles are basically applied using the `style` property
      // Same way as React Native does by default
      <View style={styles.header}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}

// generates objects for each selector
const styles = StyleSheet.create({
  header: {
    color: 'red',
    // You can also use mixins with the same selector.
    // They'll get split intelligently and evaluated on render
    'status=active': {             
      backgroundColor: 'green',
      'size>=20': {            
        backgroundColor: 'pink'       
      }
    }
  },
  title: {
    fontWeight: 800,
    // use functions to inject props, state or context values
    fontSize: (props, state, context) => props.size * state.zoom
  }
})

export default look(Header)
```
Finally you only need to wrap your application with LookRoot.
```javascript
import { Presets,  LookRoot } from 'react-look-native'
import React, { AppRegistry, Component }  from 'react-native'
import Header from './Header'

// A simple basic app just showing the Header with "Hello World"
const App = () => <Header title="Hello World" />

// We ust create another container to wrap our App
const Container = () => (
  <LookRoot config={Presets['react-native']}>
    <App />
  </LookRoot>
)

AppRegistry.registerComponent('native', () => Container)
```
# Demo
Right now I am working to get a running React Native example ready. Stay tuned.

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
