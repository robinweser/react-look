# 7. FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Can I still use CSS somehow?](#3-css-compatibility)

## 1. CSS Compatibility
In some cases it is even useful to apply some global css selectors. This can be achieved using the [CSS](api/CSS.md).  <br>CSS creates a static CSS strings which gets applied within an `<style></style>`-tag. You can even modify it later on and CSS automatically applies your changes with a minimum of DOM manipulations.

### Usage
You can either use it as you would any CSS by just applying a `className` property or use the build-in `css` property provided by extract-css mixin which resolves into a valid `className` string. Look automatically concatenates those.

```javascript
import Look, {CSS, StyleSheet} from 'react-look/dom'

let global = new CSS({
  '.header' : {
    color: 'blue',
    fontSize: 'red'
  },
  '.header-hover' : {
    color: 'red'
  }
})

@Look
class Header extends React.Component {  
  render(){
    // => <div class="header header-hover">Header</div>
    return <div look={styles}>Header</div>
  }
}

const styles = StyleSheet.create(Header, {
  css : '.header',
  ':hover' : {
    css : '.header-hover'
  }
})
``` 