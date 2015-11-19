# FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Can I still use CSS somehow?](#3-css-compatibility)

## 1. CSS Compatibility
In some cases it is even useful to apply some global css selectors. This can be achieved using the [StyleSheet.toCSS](api/StyleSheet.md).  <br>It creates a static CSSRule which gets applied to the global StyleSheet Look uses.

### Usage
You can either use it as you would any CSS by just applying a `className` property or use the build-in `css` mixin which resolves into a valid `className` string. Look automatically concatenates those.

```javascript
import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look/dom'

@Look
class Header extends Component {  
  render(){
    // => <div class="header header-hover">Header</div>
    return <div look={styles}>Header</div>
  }
}

StyleSheet.toCSS({
  '.header' : {
    color: 'blue',
    fontSize: 'red'
  },
  '.header-hover' : {
    color: 'red'
  }
})

const styles = StyleSheet.create(Header, {
  css : '.header',
  ':hover' : {
    css : '.header-hover'
  }
})
```
