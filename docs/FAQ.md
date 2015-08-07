<div style="float:left">[< **7. Mixins**](Mixins.md)</div>
<div style="float:right">[**API** >](/api/Look.md)</div>

# FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

## Table of content
1. [Additional styles & processors](#1-additional-styles--processors)
2. [Global styles](#2-global-styles)
3. [Look shortcut](#3-look-shortcut)
4. [Extend mixin / unsupported pseudo classes](#4-react-look-tools)

More cases are coming soon.

## 1. Additional styles & processors
In some situations you need to apply additional styles or use some additional processors. You can do this by passing those directly to the `Look()`-method.

```javascript
import themedStyle from './theme/Header.js';

let styles = {
  header : {
    marginLeft: 5
  },
  title : {
    fontSize: 20
  }
}

Look(Header, [styles, themedStyle], Processors.Mixins)
```

## 2. Global styles
In some cases it is even useful to apply some global css selectors. This can be achieved using the [Global](api/Global.md).  <br>Global creates a static CSS strings which gets applied within an `<style></style>`-tag. You can even modify it later on and Global automatically applies your changes with a minimum of DOM manipulations.

## 3. Look shortcut
Quite often you only want a single Look to be applied, so why should you even type a selector and reference it? Well, you don't need to.

```javascript
class Button extends React.Component(){
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
    return <div look>Damn simple</div>
  }
}

export default Look(Button)
```
Look will actually treat a single style object as `default` and reference it automatically by using key-only `look` prop.

## 4. react-look-tools
Huh? react-look-tools what? You are probably searching for an extend mixin or some unsupported pseudo classes, right? That's exactly what [react-look-tools](https://github.com/rofrischmann/react-look-tools) was made for. Take a look at its [README](https://github.com/rofrischmann/react-look-tools/README.md) to learn how to use them.
### Why another package?
Look is a really future-rich styling library for React which still remains hackable, customizable and **performant**. I am trying to keep it as clean as possible and still easy to use.<br> Providing a lot of basic **pseudo classes** helps to build a lot of stuff even without Look Tools, but I won't support everything CSS provides by default since there's a lot overhead. 
> **Ask yourself**: Have you ever used  `::-webkit-scrollbar-thumb` or `:placeholder-shown` more than once? Most likely not.

