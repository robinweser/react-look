# Look
**Look** is a feature-rich styling library for [React.js](https://facebook.github.io/react/) that supports lots of CSS features as well as **stateful** styles.     
It extends your inline styles and still remains hackable and processable since it is based on [Dynamic Style Sheets](https://github.com/dynamicstylesheets).

> It got inspired by [Cristopher Chedeau (@vjeux)](https://twitter.com/vjeux)'s presentation [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) as well as [Radium](http://projects.formidablelabs.com/radium/) and [ReactCSS](http://reactcss.com).

# Benefit
Using inline styles instead of static CSS files has a lot of positive side-effects. The most important one is **dynamic behavoir**.<br>Remember you're using JavaScript now. You're styles no longer belong to a static file but are mapped to an Object that can be manipulated in any given way.

## Component-scoped
It encourages you to define your styles scoped to your Component which helps to improve your app structure and keeps together all Component-relevant data.<br>It also avoids specificity or namespacing conflicts and eliminates dead code this it get's never applied to your DOM actively.

# Features
- ES6 classes
- _(nested)_ media-queries
- _(nested)_ pseudo-classes
- _(nested)_ stateful styles (condition based)
- processors (prefixing, flexbox support, ...)
- dynamic style manipulation

### [Supported pseudo-classes](pseudoClasses.md)
*(Check here to get detail information on supported pseudo-classes)*
# Under the hood
### Dynamic Style Sheets
Under the hood Look is based on **[Dynamic Style Sheets](https://github.com/dynamicstylesheets)** which is an lightweight interface for style object manipulation. It also ship an interface for dynamic CSS sheet interaction that automatically diffs changes to your DOM which might be used in an early stage to add unsupported CSS-features.  _(Check the organisation for more information)_.

#### Processors
DSS (Dynamic Style Sheets) inlcude a processor interface that let's you apply any valid processor e.g. [Vendor Prefixing](https://github.com/dynamicstylesheets/DSS-Prefixer).

**Power up your styles for your own custom needs!**

# Usage
> Warning: Still in early stage. Heavy changes could (hope not) occur.

```sh
npm install react-look
```

```javascript
import React from 'react';
import {Look} from 'react-look';
import {Processors} from 'dynamic-style-sheets';
let {Prefixer, Flexbox} = Processors;

function custom(value){
  return value * 2 + 10
}

let sheet = new Look({
  header : {
    padding: custom(5),               // use benefit of javascript
    color: '#fff',
    transition: '200ms all linear',
    ':hover' : {                      // pseudo-classes
        fontSize: 15,
        ':checked' : {                // also nested
            color: 'red'
        },
    },
    '@media (min-height: 800px)' : {  // media queries
      fontSize: 13,
      ':hover' : {
        color: green
      }
    },

    'status=active' : {               // conditioned styles
      backgroundColor: 'green',
      'theme=pink' : {
        backgroundColor: 'pink'       // nested conditions
      }
    },
    'status=disabled' : {
      backgroundColor: 'gray',
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
      <header look="header" onClick={this.onClick}>
        <h1 look="title">
          {this.props.title}
        </h1>
      </header>
    )
  }
}

export default Look.apply(Header);
```

# Roadmap
- [ ] **docs (in progress)**
- [ ] **clean up / readability improvement**
- [ ] **>, <, >=, <= support for conditions**
- [ ] type-sensitive (:nth-of-type, :first-of-type, :last-of-type, :nth-last-of-type, :only-of-type)
- [ ] GlobalSheet for global CSS styles

### react-look-tools
- [ ] `@keyframe` support
- [ ] extend functionality
- [ ] special pseudos (:placeholder, :webkit-scrollbar)
- [ ] **dev processor for better DX (for stateful styles)**

# License
**Look** (react-look) is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>Created with ♥ by [@rofrischmann](http://rofrischmann.de) at [Unverschämt](http://unverschaemt.net).

# Issue / Contributing
Got any issues or need a great feature that is not (yet) supported?     
Feel free to create an issue/request and I will handle that as fast as possible.
