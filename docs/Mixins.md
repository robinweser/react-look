<div style="float:left"><a href="Processors.md">< <b>6. Processors</b></a></div>
<div style="float:right"><a href="VendorPrefixes.md"><b>8. Vendor Prefixes</b> ></a></div>

# 7. Mixins

Define custom keys which get resolved using a special function before your styles get applied. 

## Usage
```javascript
import Look from 'react-look';
import {Component} from 'react-look';

function resolveFixed(arr){
    return {
      top: arr[0],
      right: arr[1],
      bottom: arr[2],
      left: arr[3],
      position: 'fixed'
    }
}

@Look
class Button extends Component {
  static mixins = {fixPos: resolveFixed}
  
  look(){
    return {
      fixPos : [10, 50, 0, 50]
    }
  }
  
  render(){
    // => <div style="top: 10px; right: 50px; bottom: 0; left: 50px; position: fixed">Button</div>
    return <div look>Button</div>
  }
}
```