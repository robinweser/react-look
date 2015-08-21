<div style="float:left"><a href="VendorPrefixes.md">< <b>8. Vendor Prefixes</b></a></div>
<div style="float:right"><a href="api/Look.md"><b>API</b> (1. Look) ></a></div>

# 9. FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [How to use additional styles & processors?](#1-additional-styles--processors)
2. [Can I reduce boilerplate?](#2-look-shortcut)
3. [Can I still use CSS somehow?](#3-css-compatibility)
4. [What about unsupported pseudo classes?](#4-look-addons)

## 1. Additional styles & processors
In some situations you need to apply additional styles or use some additional processors. You can do this by passing those directly to the `Look()`-method.

```javascript
import Look from 'react-look';
import themedStyle from './path/to/theme/Header.js';
import Mixins from 'dss-mixins';

let styles = {
  header : {
    marginLeft: 5
  },
  title : {
    fontSize: 20
  }
}

Look(Header, [styles, themedStyle], Mixins)
```

## 2. Look shortcut
Quite often you only want a single Look to be applied, so why should you even type a selector and reference it? Well, you don't need to.

```javascript
import Look from 'react-look';

class Button extends React.Component {
  look(){
    return {
      color: 'blue',
      fontSize: 15,
      ':hover' : {
        color: 'red'
      }
    }
  }
  
  render(){
    return <div look>Minimum</div>
  }
}

export default Look(Button)
```
Look will actually treat a single style object as `default` and reference it automatically by using key-only `look` prop.

## 3. CSS Compatibility
In some cases it is even useful to apply some global css selectors. This can be achieved using the [CSS](api/CSS.md).  <br>CSS creates a static CSS strings which gets applied within an `<style></style>`-tag. You can even modify it later on and CSS automatically applies your changes with a minimum of DOM manipulations.

### Usage
You can either use it as you would any CSS by just applying a `className` property or use the build-in `css` property which resolves into a valid `className` string. Look automatically concatenates those.
```javascript
import Look, {CSS} from 'react-look';

let global = new CSS({
  '.header' : {
    color: 'blue',
    fontSize: 'red'
  },
  '.header-hover' : {
    color: 'red'
  }
});

class Header extends React.Component {
  look(){
    return {
      css : '.header',
      ':hover' : {
        css : '.header-hover'
      }
    }
  }
  
  render(){
    return <div look>Header</div>
  }
}

export default Look(Header); // => <div class="header header-hover">Header</div>
```

## 4. Look Addons
Huh? Addons what? Yeah right, I am currently working on some nice addons which will add support for quite every unsupported CSS pseudo class. 