<img src="docs/res/banner.png" width="300">

![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)
![Dependencies](https://david-dm.org/rofrischmann/react-look.svg)
![Gzipped Size](https://img.shields.io/badge/gzipped-~6k-blue.svg)

**Look** is a modular, **plugin**-based and **feature-rich** styling library for [React](https://facebook.github.io/react/) and [React Native](https://github.com/facebook/react-native) using **inline styles**.
It simplyfies how you are styling your Components and comes in two different configurations by default.

# Features
- ECMAScript 2015 (ES6) Classes & `React.createClass`
- stateless Components
- [15 pseudo classes](docs/plugins/Mixin.md#pseudo-classes.md)
- [stateful styles](docs/plugins/Mixin.md#stateful-conditions.md) (condition based)
- nesting
- [plugins](docs/Plugins.md)
- [extending](docs/plugins/Mixin.md#extend)
- modular & themeable
- [State API](docs/api/State.md)

The `react-look/dom` package also adds additional DOM-specific mixins as well as a vendor-prefixing plugin.<br>
 ![Gzipped Size](https://img.shields.io/badge/gzipped-~14k-blue.svg)

- [media queries](docs/plugins/Mixin.md#media-queries.md)
- [platform queries](docs/plugins/Mixin.md#platform-queries.md)
- [34 pseudo classes](docs/plugins/Mixin.md#pseudo-classes.md)
- [vendor prefixing](docs/plugins/Prefixer.md)
- [pseudo to CSS polyfill](docs/plugins/Mixin.md#pseudo-to-css)
- [font-face API](docs/api/StyleSheet.md#font-face)
- [keyframes API](docs/api/StyleSheet.md#keyframes)
- [CSS API](docs/api/StyleSheet.md##tocssstyles--scope-media-id)

### [Supported pseudo classes](docs/plugins/Mixin.md#supported-pseudo-classes)
# Benefit
Using inline styles instead of static CSS files has a lot of positive side-effects. The most important one is **dynamic behavior**.<br>Remember you're using JavaScript now. Your styles no longer belong to a static file but are just a plain javascript object which can be manipulated, extended or iterated to fit your very own needs.

* **Component-scoped:**
As JSX brings your View-structure to JavaScript, Look adds your **styling** (CSS) as well.<br>
It encourages you to define your styles scoped to your Component which helps to improve your app structure and keeps together all Component-relevant data. One file less to create.
* **Separation of Concerns:**
Look tries to keep your styling separated from your logic as much as possible while other styling libraries often encourage style validations such as `this.state.checked && styles.checked` within your `render()`-method.

# Usage
> Coming from version < 0.5? Check the [upgrade guide](docs/guides/upgradeLook.md).

```sh
npm install react-look
```
The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries. Use nested objects to define pseudo classes, media queries or conditioned styles. <br>

The example uses an ES7 decorator which is not part of the ECMAScript specification by now (and perhaps will never be). Alternatively just wrap your Component e.g. `Header = Look(Header)`<br>

```javascript
import React, { Component, PropTypes } from 'react'
import Look, { StyleSheet } from 'react-look/dom'

@Look
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

### Different packages
If you're wondering which package you should use. This depends on your needs.

#### Preconfigured
* `react-look` includes everything available for both React and React Native.
* `react-look/dom` adds a lot of DOM-only plugins and custom properties.

#### Do it yourself
* `react-look/core` is used if you want to use a [custom configuration](docs/guides/configureLook.md) for Look.
* `react-look/addons` includes every plugin, mixin and tools used to configure your custom Look instance.

# Demo
Check out the provided examples for some special use cases. See them in action using the demo. You can visit the [live-demo](http://rofrischmann.de/react-look/) *(Caution: This is outdated right now)* or  easily run the examples on your own within the provided demo by just:
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
npm install
npm run demo
```

# [Documentation](docs/Docs.md#table-of-contents)
The documentation gives huge information on how to do all kind of stuff. It also serves detailed information on how to use plugins, use full power of the build-in ones and even how to write your own.<br>

* [Usage Guides](docs/guides/)
* [API](docs/api/)
* [Plugins](docs/plugins/)
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
