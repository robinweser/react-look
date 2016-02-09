# FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Can I still use CSS syntax?](#1-css-syntax)

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
