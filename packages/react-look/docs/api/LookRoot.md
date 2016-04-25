# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application to pass down configuration and to render CSS styles. It is similar to *e.g.* Redux's `<Provider>`.<br>

### props
| Property | Description |
| ---  | ----------- |
| config | global Look configuration, will automatically be spread to all child Components using `context`. |

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
  <LookRoot config={composedConfig}>
    <App />
  </LookRoot>,
  document.getElementById('app')
)
```
