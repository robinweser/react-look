<img src="docs/res/banner.png" width="300">

![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![bitHound Overalll Score](https://www.bithound.io/github/rofrischmann/react-look/badges/score.svg)](https://www.bithound.io/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)
![Dependencies](https://david-dm.org/rofrischmann/react-look.svg)
![Gzipped Size](https://img.shields.io/badge/gzipped-~17k-blue.svg)

**Look** is a modular, **plugin**-based and **feature-rich** styling library for [React](https://facebook.github.io/react/) and [React Native](https://github.com/facebook/react-native) using **inline styles**.
It simplyfies how you are styling your Components and comes in two different configurations by default.

# Features
- ECMAScript 2015 Classes
- `React.createClass`
- stateless Components
- configurable
- server-side rendering
- [plugins](docs/Plugins.md)
- nesting
- [34 pseudo classes](docs/Mixins.md#pseudo-classes.md)
- [stateful styles](docs/Mixins.md#stateful-conditions.md) (condition based)
- [extending](docs/Mixins.md#extend)
- [media queries](docs/Mixins.md#media-queries.md)
- [platform queries](docs/Mixins.md#platform-queries.md)
- [vendor prefixing](docs/plugins/Prefixer.md)
- developer tools (styleLogger, linter)
- [pseudo to CSS polyfill](docs/plugins/Mixin.md#pseudo-to-css)
- [font-face API](docs/api/StyleSheet.md#font-face)
- [keyframes API](docs/api/StyleSheet.md#keyframes)
- [CSS API](docs/api/StyleSheet.md##tocssstyles--scope-media-id)
- [State API](docs/api/State.md)

### [Supported pseudo classes](docs/Mixins.md#supported-pseudo-classes)

# Usage
> Upgrading from an older major update? Check out the [upgrade guide](docs/guides/upgradeLook.md).

```sh
npm install react-look
```
The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries. Use nested objects to define pseudo classes, media queries or conditioned styles. <br>


```javascript
import React, { Component, PropTypes } from 'react'
import Look, { StyleSheet } from 'react-look'

class Header extends Component {
  static defaultProps = {size: 24}
  static propTypes = {size: PropTypes.number.isRequired}
  state = {status: 'active'}

  render() {
    return (
      // Apply your styles with the `look` property.
      <header look={styles.header}>
        <h1 look={styles.title}>
          {this.props.title}
        </h1>
      </header>
    )
  }
}

// creates a Header-scoped StyleSheet
const styles = StyleSheet.create(Header, {
  header: {
    transition: '200ms all linear',
    // Use mixins such as media queries or pseudo classes
    // using nested style objects. Those get evaluated
    // on the fly and can be nested endlessly.
    // You can even create your own mixin.
    '@media (min-height: 800px)': {
      fontSize: 13,
      ':hover': {    
        fontSize: 15,
      }
    },
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

export default Look(Header)
```
### Stateless Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14. *(Currently Look creates a Stateful Component for instant support)*
```javascript
const Header = ({title}) => (
  <header look={styles.header}>
    <h1 look={styles.title}>
      {title}
    </h1>
  </header>
)

const styles = StyleSheet.create(Header, {/* See above */})
export default Look(Header)
```
### React Native
Look also supports React Native to use stateful conditions or pseudo classes such as `:first-child`.<br>
As you are most likely using the `StyleSheet.create` provided by React Native. You might just swap that with Look's `StyleSheet` and add the scope parameter.<br>

> NOTE: React Native does not support every ECMAScript 2015 (ES6) & ECMAScript 2016 (ES7) feature out of the box and it could be quite a mess to get it running properly though.

### Configuration
Look ships without any plugin or mixin configured. You need to configure them on your own or use one of the presets.<br>
`react-look/addons` includes every plugin, mixin, devTool and preset used to configure  Look.
```javascript
import { Presets, DevTools } from 'react-look/addons'

const customConfig = Presets['react-dom']
customConfig.plugins.push(DevTools.styleLogger)

// By default you pass your configuration as
// lookConfig to your root Component
ReactDOM.render(<App lookConfig={customConfig} />, document.getElementById('app'))
```

Check out the detailed [configuration guide](docs/guides/configureLook.md).

# Demo
Check out the provided examples for some special use cases. See them in action using the demo. You can easily run the examples on your own within the provided demo by just:
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
npm install
npm run babel
# run this as a client-side only demo
npm run demo
# run this as a universal demo
npm run demo:universal
```

# [Documentation](docs/Docs.md#table-of-contents)
The documentation gives huge information on how to do all kind of stuff. It also serves detailed information on how to use plugins, use full power of the build-in ones and even how to write your own.<br>

* [Usage Guides](docs/guides/)
* [API](docs/api/)
* [Plugins](docs/plugins/)
* [Mixins](docs/Mixins.md)
* [FAQ](docs/FAQ.md)

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
