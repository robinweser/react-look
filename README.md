<h1><img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/logo.png" width=350></h1>

![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Test Coverage](https://codeclimate.com/github/rofrischmann/react-look/badges/coverage.svg)](https://codeclimate.com/github/rofrischmann/react-look/coverage) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)

**Look** is a modular, **plugin**-based and **feature-rich** styling library for [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/). <br>
Platform differences are flagged using either <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15> or <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/native-badge.png" height=15>. If not flagged, it is available for both.
> **Warning**: The documentation references the 1.0.0-beta. For legacy docs check [here](https://github.com/rofrischmann/react-look/tree/9a7261b16f9a06e8cd7e64773d19714fd4181219).

# Features
- ES2015 Classes & `React.createClass`
- stateless Components
- server-side rendering <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [plugin-based](docs/Plugins.md)
- [developer tools](docs/Plugins.md#developertools)
- Sass-like nesting
- [pseudo classes](docs/dom/api/StyleSheet.md#pseudo-classes) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [media queries](docs/dom/api/StyleSheet.md#media-queries) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [platform queries](docs/Mixins.md#platform-queries) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [conditioned styles](docs/Mixins.md#stateful-conditions)
- [stateful values](docs/plugins/StatefulValue.md) & [selectors](docs/plugins/StatefulSelector.md)
- [fallback values](docs/plugins/FallbackValue.md) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [extending](docs/Mixins.md#extend)
- [vendor prefixing](docs/plugins/Prefixer.md) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>
- [CSS](docs/dom/api/StyleSheet.md##addcssstyles--scope-media-id), [font-face ](docs/dom/api/StyleSheet.md#fontfontfamily-files--properties) & [keyframes API](docs/dom/api/StyleSheet.md#keyframesframes--name) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=15>

# [Documentation](docs/Docs.md)
The documentation contains information on every part of Look including usage guides and API reference.

**New to Look?**<br>
Make sure to check out the the relevant Getting Started guide which provides a full guide on how to use Look. From installation, over configuration and up to even developer tooling.

#### [Getting Started - React](docs/dom/GettingStarted.md)<br> [Getting Started - React Native](docs/native/GettingStarted.md)

# Example Component
> This is only an example Component and won't run out of the box without wrapping your App. See the Getting Started guide on how to setup Look correctly.

The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries.

<img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=25>
```sh
npm install react-look
```
Using with `react-dom` Look ships **pseudo class** and **media query** support by default. They're resolved within the `StyleSheet.create` method.
```javascript
import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'

class Header extends Component {
  static defaultProps = { size: 24 };
  static propTypes = { size: PropTypes.number.isRequired };
  state = { status: 'active' };

  render() {
    return (
      // Styles are basically applied using the `className` property
      <header className={styles.header}>
        <h1 className={styles.title}>
          {this.props.title}
        </h1>
      </header>
    )
  }
}

// generates classNames for each selector
const styles = StyleSheet.create({
  header: {
    transition: '200ms all linear',
    // Use media queries or pseudo classes
    // using nested style objects. Those get transformed
    // on the fly and can be nested endlessly.
    '@media (min-height: 800px)': {
      fontSize: 13,
      ':hover': {
        fontSize: 15
      }
    },
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
<br>
<img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/native-badge.png" height=25>
```sh
npm install react-look-native
```
Using with `react-native` only a part of the plugins, mixins and devTools is available.
You also import some stuff differently.
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
# Demo
Check out the provided examples for some special use cases. See them in action using the demo. You can easily run the examples on your own within the provided demo by just.

<img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/dom-badge.png" height=25>
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
npm install
npm run babel
# run this as a client-side only demo
npm run demo
# run this as a universal demo
npm run demo:universal
```
<br>
<img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/native-badge.png" height=25>

Right now I am working to get a running React Native example ready. Stay tuned.

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

# Contributing
I would love to see people getting involved.<br>
If you have a feature request please create an issue. Also if you're even improving Look by any kind please don't be shy and send a pull request to let everyone benefit.

### Issues
If you're having any issue please let me know as fast as possible to find a solution a hopefully fix the issue. Try to add as much information as possible such as your environment, exact case, the line of actions to reproduce the issue.

### Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Also always add some **tests** unless it's totally senseless (add a reason why it's senseless) and test your code before you commit so Travis won't throw errors.
