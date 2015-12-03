# FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Can I still use CSS somehow?](#1-css-compatibility)
2. [Global CSS (keyframes, fontFace, ...) does not get rendered?](#2-global-css-rules)

## 1. CSS Compatibility
In some cases it is even useful to apply some global css selectors. This can be achieved using the [StyleSheet.toCSS](api/StyleSheet.md#tocssstyles--scope-useragent).  <br>It creates a static CSS rule which gets applied to the global StyleSheet Look uses.

### Usage


```javascript
import { StyleSheet } from 'react-look'

StyleSheet.toCSS({
  '*': {
    margin: 0,
    padding: 0,
    box-sizing: 'border-box'
  },
  '.header' : {
    color: 'blue',
    fontSize: 'red'
  },
})
```

## 2. Global CSS rules
In order to get global CSS rendered as expected. You need to add the `lookRoot: true` to the top-level (root) Component's configuration. Look will then wrap the root Component into an extra `<div></div>` and add a `<style></style>` element containing all global CSS rules just after the root Component.

```javascript
import React from 'react'
import Look from 'react-look'
import { render } from 'react-dom'

let App = () => <div>/* app content */</div>
App = Look(App, {lookRoot: true})

render(<App />, document.getElementById('app'))
```
