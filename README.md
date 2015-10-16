<img src="docs/res/banner.png" width="300">

![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)
![Dependencies](https://david-dm.org/rofrischmann/react-look.svg)
```sh
npm install react-look
```
> Coming from version < 0.5? Check the [upgrade guide](docs/guides/upgradeLook.md).

**Look** is a modular, **processor**-based and **feature-rich** styling library for [React](https://facebook.github.io/react/) and [React Native](https://github.com/facebook/react-native) *(starting with Version 0.4)* based on **inline styles**.
It simplyfies how you are styling your Components and comes with two different packages.

# Features
Look is as far as I know the **feature richest** inline-styling library for React. <br>
Supporting [25 pseudo classes](docs/PseudoClasses.md) out of the box as well as **stateful styles**.
- ES6 Classes, `React.createClass` & Stateless Components
- [pseudo classes](docs/PseudoClasses.md)
- [stateful styles](docs/StatefulConditions.md) (condition based)
- nesting
- [plugins](docs/Plugins.md)
- [extending](#extending)
- modular & themeable
- useful APIs

The `react-look/dom` package also adds additional DOM-specific mixins as well as a vendor-prefixing processor.
- [media queries](docs/MediaQueries.md)
- [pseudo classes](docs/PseudoClasses.md)
- [vendor prefixing](docs/VendorPrefixes.md)
- [CSS-API](docs/api/CSS.md)

### [Supported pseudo classes](docs/PseudoClasses.md#supportedpseudoclasses)
# Benefit
Using inline styles instead of static CSS files has a lot of positive side-effects. The most important one is **dynamic behavior**.<br>Remember you're using JavaScript now. Your styles no longer belong to a static file but are just a plain javascript object which can be manipulated to fit your very own needs.

* **Component-scoped:**
As JSX brings your View-structure to javascript, Look adds your **styling** (CSS) as well.<br>
It encourages you to define your styles scoped to your Component which helps to improve your app structure and keeps together all Component-relevant data. One file less to create.
* **Separation of Concerns:**
Look tries to keep your styling separated from your logic as much as possible while other styling libraries often encourage style validations such as `this.state.checked && styles.checked` within your `render()`-method.

# Usage
The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries. Use nested objects to define pseudo classes, media queries or conditioned styles. <br>

The example uses an ES7 Decorator. Alternatively wrap your Component with Look. e.g. `Header = Look(Header)`<br>

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
    // Use media queries, pseudo classes and stateful styles
    // using nested style objects. Those get evaluated
    // on the fly and can be nested endlessly.
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
    // use functions to inject props or state values
    fontSize: (props) => props.size
  }
})
```

### Stateless Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14. *(Currently Look creates a Stateful Component for instant support)*
```javascript
let Header = ({title}) => (
  <header look={styles.header}>
    <h1 look={styles.title}>
      {title}
    </h1>
  </header>
)
```
### React Native
Look also supports React Native to use stateful conditions or pseudo classes such as `:first-child`.<br>
As you are most likely using the `StyleSheet.create` provided by React Native. You might just swap that with Look's `StyleSheet` and add the scope parameter.<br>

> NOTE: React native does not support every ES6 & ES7 feature out of the box and it could be quite a mess to get it running properly though.

# Demo
Check out the provided examples for some special use cases. See them in action using the demo.<br>
You can visit the [live-demo](http://rofrischmann.de/react-look/) or  easily run the examples on your own within the provided demo by just:
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
npm install
npm run demo
```

# [Documentation](docs/Docs.md#tableofcontents)
The documentation gives huge information on how to do all kind of stuff. It also serves detailed information on how to use plugins, use full power of the build-in ones and even how to write your own.<br>

* [Usage Guides](docs/guides/)
* [API](docs/api/)
* [FAQ](docs/FAQ.md)

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

# Contributing
I would love to see people getting involved.<br>
If you have a feature request please create an issue. Also if you're even improving Look by any kind please don't be shy and send a pull request to let everyone benefit.

### Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Also always add some **tests** unless it's totally senseless (add a reason why it's senseless) and test your code before you commit so Travis won't throw errors.
