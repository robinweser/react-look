# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application to pass down configuration and to render CSS styles. It is similar to *e.g.* Redux's `<Provider>`.<br>

### props
| Property | Description |
| ---  | ----------- |
| config | global Look configuration, will automatically be spread to all child Components using `context`. |
| style | styles the wrapping `div` which `LookRoot` creates.

## Usage
```javascript
import { LookRoot, Presets, Plugins } from 'react-look'
import { render } from 'react-dom'
import React from 'react'
import App from '../index'

// Generating some configuration
const composedConfig = Presets['react-dom']
composedConfig.plugins.push(Plugins.friendlyClassName)

render(
  <LookRoot config={composedConfig} style={wrapperStyles}>
    <App />
  </LookRoot>,
  document.getElementById('app')
)

// Basically use the same as you style body, #app
// or any other outer wrapper
const wrapperStyles = {
  width: '100%',
  height: '100%'
}
```
