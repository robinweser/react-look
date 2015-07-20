# Look

```sh
npm install react-look
```

**Look** is a **feature-rich** styling library for [React.js](https://facebook.github.io/react/) that supports lots of CSS features as well as **stateful** styles. It extends your inline styles and still remains hackable and processable since it is based on [Dynamic Style Sheets](https://github.com/dynamicstylesheets).

> It got inspired by [Cristopher Chedeau (@vjeux)](https://twitter.com/vjeux)'s presentation [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) as well as [Radium](http://projects.formidablelabs.com/radium/) and [ReactCSS](http://reactcss.com).

# Features
Look is as far as I know the **feature richest** styling library for React. Supporting [27 pseudo classes](docs/PseudoClasses.md) and **stateful styles** which is an awesome shortcut if you need some styles depending on your current `state` and/or `props`.
- ES6 classes
- _(nested)_ media-queries
- _(nested)_ pseudo classes
- _(nested)_ stateful styles (condition based)
- processors (prefixing, flexbox support, ...)
- dynamic style manipulation

### [Supported pseudo classes](docs/PseudoClasses.md#supportedpseudoclasses)

# Benefit
Using inline styles instead of static CSS files has a lot of positive side-effects. The most important one is **dynamic behavior**.<br>Remember you're using JavaScript now. Your styles no longer belong to a static file but are mapped to an Object that can be manipulated in any given way.

### Component-scoped
It encourages you to define your styles scoped to your Component which helps to improve your app structure and keeps together all Component-relevant data.<br>It also avoids specificity or namespacing conflicts and eliminates dead code this it get's never applied to your DOM actively.

### Separation of Concerns
Look tries to keep your `render` function clean of validations such as `this.state.checked && styles.checked` which often gets encouraged by other styling library. This keeps some kind of component-based separation of concerns as long as your state **only** exists to change styles.

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

let sheet = new Look({
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
    'status=active' : {               // conditioned styles
      backgroundColor: 'green',
      'theme=pink' : {                // nested conditions
        backgroundColor: 'pink'       
      }
    }
  },
  title : {
    fontWeight: 800
  }
})

sheet.process([Prefixer, Flexbox])    // process your styles to add vendor prefixes and global flexbox support
```

## Component

```javascript
class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      status: 'active'
    }
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

  export default Look.applyTo(Header);  //Your styles get applied here
```

# Under the hood
## Dynamic Style Sheets
Under the hood Look is based on **[Dynamic Style Sheets](https://github.com/dynamicstylesheets)** which is an lightweight interface for style object manipulation. It also ships an interface for dynamic CSS sheet interaction that automatically diffs changes to your DOM which might be used in an early stage to add unsupported CSS-features.  _(Check the organisation for more information)_.

### Processors
DSS (Dynamic Style Sheets) inlcude a processor interface that let's you apply any valid processor e.g. [Vendor Prefixing](https://github.com/dynamicstylesheets/DSS-Prefixer). See this frequently updated  [list](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets#available-processors) for all available processors I've done so far.

**Power up your styles for your own custom needs!**

## Life cycle
Similar to Radium, Look wraps the `render` function and modifies applied styles while iterating recursive over all children. It adds missing event listeners to match `:hover`, `:active`, `:focus` and `:valid`, `:invalid`. Those action states get saved within your wrapping component *(You can adress those with the [State API](docs/api/State.md))*.<br> It also counts (type-specific) indexes to validate index-specific pseudo classes such as `:nth-child` or `` `:nth-type-of``.
![Life cycle](docs/res/lifecycle.png)

# Docs 
I tried to write as much helpful documentation as possible. Before asking any question or creating an issue please be sure to read all the documentation. <br><br>
Check out the [table of contents](docs/Docs.md#tableofcontents) for a quick overiew. 

# [react-look-tools](https://github.com/rofrischmann/react-look-tools)
react-look-tools is a toolchain of useful **helper** and **mixins**.
It adds support for **extending**, **keyframes** and a lot of css hacks that can't be achieved with pure javascript.
It also provides an useful **developer tool** to improve **DX (developer experience)**.

# Roadmap
- [ ] **use-case examples**
- [ ] Global (Sheet extension) for global CSS styles

# License
**Look** (react-look) is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>Created with ♥ by [@rofrischmann](http://rofrischmann.de) at [Unverschämt](http://unverschaemt.net).

# Contributing / Bugs
Got any issues or need a great feature that is not (yet) supported?<br>Feel free to create an issue/request and I will handle that as fast as possible.
