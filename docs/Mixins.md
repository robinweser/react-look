<div style="float:left"><a href="Processors.md">< <b>6. Processors</b></a></div>
<div style="float:right"><a href="VendorPrefixes.md"><b>8. Vendor Prefixes</b> ></a></div>

# 7. Mixins

Define custom keys which get resolved using a special function before your styles get applied. 
There are three different MixinTypes which you need to use.
* `MixinTypes.INCLUDE`<br>
Style key only needs to include the mixin `key`<br><br>
* `MixinTypes.EQUAL` <br>Style key must totally match the mixin `key`<br><br>
* `MixinTypes.BEGINWITH`<br>Style key must begin with the mixin `key`

> **Hint**: Use `MixinTypes.EQUAL` as often as possible as it is the safest one. <br>
`MixinTypes.BEGINWITH` and `MixinTypes.INCLUDE` are only made for dynamic mixins such as `:nth-child(an+b)`

## Usage
### Arguments
Look passes 4 special arguments which can be used within your Mixin. Those are:
* **Component**: Current wrapping React Component
* **element**: Current element that gets resolved
* **newProps**: Properties used to clone the Component (including old `element.props`)
* **childIndexMap** Information on `element`'s index within its parent node

```javascript
import Look, {MixinTypes} from 'react-look'
import React, {Component} from 'react'

let fixPosMixin = {
  key: 'fixPos',
  type: MixinTypes.EQUAL,
  
  // => key = style object key ('fixPos' in this case)
  // => args = {Component, element, newProps, childIndexMap}
  fn: (key, value, args) => {
    return {
      top: value[0],
      right: value[1],
      bottom: value[2],
      left: value[3],
      position: 'fixed'
    }  
  }
}

@Look
class Button extends Component {
  static mixins = [fixPosMixin]
  look = {
    fixPos : [10, 50, 0, 50]
  }
  
  render(){
    // => <div style="top: 10px; right: 50px; bottom: 0; left: 50px; position: fixed">Button</div>
    return <div look>Button</div>
  }
}
```