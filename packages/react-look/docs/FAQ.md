# FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Can I still use CSS syntax?](#1-css-syntax)
2. [Can I use a custom `<style>`-element?](#2-custom-style-element)
3. [How to get a smaller production bundle?](#3-small-production-bundle-size)

## 1. CSS Syntax
Some of you might prefer the good old CSS syntax with dash-cased property names and string-by-default values.
We do not provide this out of the box to keep simplicity, but you could use a module to transform strings or multiline [ECMAScript2015 template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings) into plain Objects.
I recommend [inline-style-transformer](https://github.com/rofrischmann/inline-style-transformer)'s [toObject](https://github.com/rofrischmann/inline-style-transformer#toobjectcss). If you got something better, please let me know.

### Usage
```javascript
import { StyleSheet } from 'react-look'
import { toObject } from 'inline-style-transformer'

const styles = StyleSheet.create({
  box: `
    font-size: 15px;
    color: red;
    transform: rotate(30deg)
  `
})
```

## 2. Custom style element
By default Look creates a new `<style>`-element with `_react-look-stylesheet` as `id`. You could also provide your own `<style>`-element by passing its `id` with the config.

### Usage
```javascript
import { LookRoot, Presets } from 'react-look'
import { render } from 'react-dom'
import React from 'react'
import App from '../index'

// Generating some configuration
const composedConfig = Presets['react-dom']
composedConfig.styleElementId = 'my-style-element'

render(
  <LookRoot config={composedConfig}>
    <App />
  </LookRoot>,
  document.getElementById('app')
)
```

## 3. Small production bundle size
You might have noticed that the [README](../) shows Look only sizes ~17kb in total *(gzipped)* but your production build actually contains a lot more bytes.

Look exports every plugin, including devTools and two prefixer. Especially the [Linter](plugins/Linter.md) and the [Dynamic Prefixer](prefixer/DynamicPrefixer.md) add up almost 100kb of file size. If you're not using them (you shouldn't use devTools in production anyways) try to exclude them from your build.
