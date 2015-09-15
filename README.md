<img src="docs/res/banner.png" width="300">

![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)
![Dependencies](https://david-dm.org/rofrischmann/react-look.svg)
```sh
npm install react-look
```
> **1.0 Release**: As soon as the documentation is ready, Release Candidate 1 will be shipped. Be sure to try that out.

**Look** is a modular, **processor**-based and **feature-rich** styling library for [React.js](https://facebook.github.io/react/) and [React Native](https://github.com/facebook/react-native) *(starting with Version 0.4)* based on **inline styles**.
It simplyfies how you are styling your Components and comes with two different packages. 

> Be sure to read my blog post [React Component styling without limitations](https://medium.com/@rofrischmann/react-component-styling-without-limitations-84e5e776fd44) which gives detail information how and why I build Look.

# Features
Look is as far as I know the **feature richest** inline-styling library for React. <br>
Supporting [25 pseudo classes](docs/PseudoClasses.md) out of the box as well as **stateful styles**.
- ES6-ready & `React.createClass`
- [pseudo classes](docs/PseudoClasses.md)
- [stateful styles](docs/StatefulConditions.md) (condition based)
- nesting
- [processors](docs/Processors.md)
- [mixins](docs/Mixins.md)
- [extending](#extending)
- !important-notation
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

The example uses an ES7 Decorator `@Look`. Alternatively wrap your Component with Look. e.g. `Header = Look(Header)`<br>

```javascript
import React, {Component, PropTypes} from 'react'
import Look from 'react-look/dom'

@Look
class Header extends Component {
  static defaultProps = {clicks: 24}
  static propTypes = {clicks: PropTypes.number.isRequired}
  state = {status: 'active'}
  look = {
    header : {
      transition: '200ms all linear',
      // Use media queries, pseudo classes and stateful styles
      // using nested style objects. Those get evaluated 
      // on the fly and can be nested endlessly.
      '@media (min-height: 800px)' : { 
        fontSize: 13,
        ':hover' : {    
          fontSize: 15,
        }
      },
      'status=active' : {             
        backgroundColor: 'green',
        'clicks>=20' : {            
          backgroundColor: 'pink'       
        }
      }
    },
    title : {
      fontWeight: 800,
      fontSize: 20
    }
  }
  
  render() {
    return (
      // Apply your styles with the `look` property.
      // If you are only using single looks you may just drop the
      // selector and just use a plain `look` property.
      <header look="header">
        <h1 look="title">
          {this.props.title}
        </h1>
      </header>
    )
  }
}
```
## React Native
Look also support React Native and lets you use stateful conditions or pseudo classes such as `:first-child`.<br>
**Already got a lot of styles?** Just add them to the wrapper and reference the 'selector' as a look.
```javascript
class Test extends React.Component {
  render(){
    return <div look="box"></div>
  }
}

let styles = StyleSheet.create({
  box : {
    color: 'red'
  }
})

module.exports = Look(Component, styles)
```
As React native does not support every ES6 Feature is could be quite a mess to get it running properly though. e.g. You need to require it using:
```javascript
var _Look = require('react-look'); 
var Look = _Look.default;
```
> Usage will be improved soon!

## Processor & Mixins
Look provides a nice interface to use custom processors. By default is ships with a Mixin processor which let's you define custom mixins. Every implemented pseudo class, media queries and even stateful conditions are also just plain mixins. There is also an autoprefixing processor for the DOM-package to add browser-specific vendor prefixes based on [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) evaluating [caniuse.com](caniuse.com) data.
> **Note**: Furhter documentation on how to create your own processors & mixins will be served as soon as 1.0 hits the ground. For now I'd like you to check out `src/mixins/` for some examples.

# Demo
Check out the examples for more specific examples for some special use cases. See them in action using the demo.<br>
You can visit the [live-demo](http://rofrischmann.de/react-look/) or  easily run the examples on your own within the provided demo by just:
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
npm install
npm run demo
```

# [Documentation](docs/Docs.md#tableofcontents)
> Please keep in mind that this is done in my leisure time and that I cannot update the docs every commit.

I tried to write as much helpful documentation as possible. Before asking any question or creating an issue please be sure to read all the documentation.<br>
The documentation gives huge information on how to do all kind of stuff. It serves detailed information on how to use processors, mixins or react-look-tools.<br>
You will also find some information on how Look works at the core and what [Dynamic Style Sheets](https://github.com/dynamicstylesheets) is all about.

## How does Look work?
Similar to Radium, Look wraps the `render` function and modifies applied styles while iterating recursive over all children.

Check [Under the hood](docs/UnderTheHood.md) for more detailed information. 

## [FAQ](docs/FAQ.md)
> Unsupported pseudo classes?<br>
Less boilerplate / shortcuts?<br>
Additional styles & Processors?<br>
Server-side rendering?


Read through the [FAQ](docs/FAQ.md) to get all those things done within seconds!

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

# Contributing
I would love to see people getting involved.<br>
If you have a feature request please create an issue. Also if you're even improving Look by any kind please don't be shy and send a pull request to let everyone benefit.
