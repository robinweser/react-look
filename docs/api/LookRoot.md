# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application in order to render CSS styles and to pass down configuration. It is similar to *e.g.* Redux's `<Provider>`.

## props
Use the `config` prop to pass down global Look configuration. It will automatically be spread to all child Components using `context`.

You may also pass some `style` to style the `div` which `LookRoot` creates. Otherwise you might see sideeffects as this div is wrapping your whole application.

## Usage
```javascript
import { LookRoot, Presets, DevTools } from 'react-look'
import { render } from 'react-dom'
import React from 'react'
import App from '../index'

// Generating some configuration
const composedConfig = Presets['react-dom']
composedConfig.plugins.push(DevTools.friendlyClassName)

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
