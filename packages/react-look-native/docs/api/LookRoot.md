# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application to pass down configuration. It is similar to *e.g.* Redux's `<Provider>`.<br>


### props
| Property | Description |
| ---  | ----------- |
| config | global Look configuration, will automatically be spread to all child Components using `context`. |

## Usage
```javascript
import { Presets, Plugins, LookRoot } from 'react-look-native'
import React, { AppRegistry, Component }  from 'react-native'
import App from './index'

const composedConfig = Presets['react-native']

const Container = () => (
  <LookRoot config={composedConfig}>
    <App />
  </LookRoot>
)
AppRegistry.registerComponent('native', () => Container)
```
