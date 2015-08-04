# Look
![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
[![npm version](https://badge.fury.io/js/react-look.svg)](http://badge.fury.io/js/react-look)

```sh
npm install react-look
```

**Look** is a **feature-rich** styling library for [React.js](https://facebook.github.io/react/) based on inline-styles that adds support for lots of CSS features as well as **stateful** styles. It extends your inline styles and is fully customizable through processors since it is based on [Dynamic Style Sheets](https://github.com/dynamicstylesheets).

> It got inspired by [Cristopher Chedeau (@vjeux)](https://twitter.com/vjeux)'s presentation [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) as well as [Radium](http://projects.formidablelabs.com/radium/) and [ReactCSS](http://reactcss.com).

# Features
Look is as far as I know the **feature richest** inline-styling library for React. <br>
Supporting [27 pseudo classes](docs/PseudoClasses.md) as well as **stateful styles** which is an awesome shortcut if you need some styles depending on any valid condition mostly used with `this.state` or `this.props`.
- ES6-ready
- media queries
- pseudo classes
- stateful styles (condition based)
- nesting
- [processors](docs/Processors.md) (Prefixer, Mixins, ...)
- modular & themeable
- useful APIs 

### [Supported pseudo classes](docs/PseudoClasses.md#supportedpseudoclasses)
# Benefit
Using inline styles instead of static CSS files has a lot of positive side-effects. The most important one is **dynamic behavior**.<br>Remember you're using JavaScript now. Your styles no longer belong to a static file but are just a plain javascript object which can be manipulated to fit your very own needs.

### Component-scoped (All-in-one)
As JSX brings your HTML to javascript, Look adds your **styling** (CSS) as well.<br>
It encourages you to define your styles scoped to your Component which helps to improve your app structure and keeps together all Component-relevant data.

### Separation of Concerns
Look tries to keep your styling separated from your logic as much as possible while other styling libraries often encourage style validations such as `this.state.checked && styles.checked` within your `render()`-method.

> **Warning:** Avoid using stateful conditions with data-sensitive states as this would mix logic and styles.

# Usage

```javascript
import React from 'react';
import Look from 'react-look';
import {Processors} from 'dynamic-style-sheets';
let {Prefixer, Flexbox} = Processors;

function custom(value){
  return value * 2 + 10
}

class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      status: 'active'
    }
  }

  look(){
    return {
      header : {
        padding: custom(5),               // use benefit of javascript
        transition: '200ms all linear',
        '@media (min-height: 800px)' : {  // media queries
          fontSize: 13,
          ':hover' : {                    // pseudo classes
            fontSize: 15,
            ':checked' : {                // can be nested
              color: 'red'
            }
          }
        },
        'status=active' : {               // stateful styles
          backgroundColor: 'green',
          'clicks>20' : {                 // nested conditions
            backgroundColor: 'pink'       
          }
        }
      },
      title : {
        fontWeight: 800
      }
    }
  }
  
  processors(){
    return [Flexbox, Prefixer]
  }
  
  render() {
    return (
      <header look="header">            //Just use the `look` prop to apply styles
        <h1 look="title">
          {this.props.title}
        </h1>
      </header>
    )
  }
}

export default Look(Header);            //Your styles get processed and resolved here
```
# [Documentation](docs/Docs.md#tableofcontents)
I tried to write as much helpful documentation as possible. Before asking any question or creating an issue please be sure to read all the documentation.<br>
The documentation gives huge information on how to do all kind of stuff. It serves detailed information on how to use processors, mixins or react-look-tools.<br>
You will also find some information on how Look works at the core and what [Dynamic Style Sheets](https://github.com/dynamicstylesheets) is all about.

## How does Look work?
Similar to Radium, Look wraps the `render` function and modifies applied styles while iterating recursive over all children.

Check [Under the hood](docs/UnderTheHood.md) for more detailed information. 

## [FAQ](docs/FAQ.md)
> Unsupported pseudo classes?<br>
Additional styles & Processors?<br>
Custom mixins?<br>
Extend styles?<br>
Server-side rendering?


Read through the [FAQ](docs/FAQ.md) to get all those things done within seconds!

#[react-look-tools](https://github.com/rofrischmann/react-look-tools)
react-look-tools is a toolchain of useful **helper** and **mixins**. It adds support for **extending**, **keyframes** and a lot of css hacks that can't be achieved with pure javascript. It also provides an useful **developer tool** to improve **DX (developer experience)**. Also check [FAQ](docs/FAQ.md) which spoils some tools as well.

# License
**Look** (react-look) is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>Created with ♥ by [@rofrischmann](http://rofrischmann.de).

# Contributing
Got any issues or need a great feature that is not (yet) supported?<br>Feel free to create an issue/request and I will handle that as fast as possible.
