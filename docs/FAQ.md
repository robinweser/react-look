#FAQ
The FAQ should help people with common tasks. Look allows you to do a lot of things since it is quite open and customizable, but sometimes it might be a bit hard to get it done all by yourself. That's why I try to ship as many examples as possible.

### Table of content
1. [Additional styles & processors](#additionstylesprocessors)
2. [Global styles](#globalstyles)

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

export default Look(Header, [styles, themedStyle], Processors.Mixins)
```

## 2. Global styles
In some cases it is even useful to apply some global css selectors. This can be achieved using the [Global](api/Global.md). 
<br>Global creates a static CSS strings which gets applied within an `<style></style>`-tag. You can even modify it later on and Global automatically applies your changes with a minimum of DOM manipulations.