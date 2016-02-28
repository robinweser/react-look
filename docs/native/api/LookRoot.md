# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application to pass down configuration. It is similar to *e.g.* Redux's `<Provider>`.<br>


### props
| Property | Description |
| ---  | ----------- |
| config | global Look configuration, will automatically be spread to all child Components using `context`  |
| style | styles the wrapping `View` which `LookRoot` creates.

## Usage
```javascript
import { Presets, Plugins, LookRoot } from 'react-look-native'
import React, { AppRegistry, Component }  from 'react-native'
import App from './index'

const composedConfig = Presets['react-native']

const Container = () => (
  <LookRoot config={composedConfig} style={wrapperStyles}>
    <App />
  </LookRoot>
)
AppRegistry.registerComponent('native', () => Container)

// Basically use the same as you style body, #app
// or any other outer wrapper
const wrapperStyles = {
  width: '100%',
  height: '100%'
}
```
