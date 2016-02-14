# LookRoot

`<LookRoot>` is a React Component used to wrap your whole application to pass down configuration. It is similar to *e.g.* Redux's `<Provider>`.<br>

<img src="../res/dom-badge.png" height=15> Also used to render CSS styles.

## props
Use the `config` prop to pass down global Look configuration. It will automatically be spread to all child Components using `context`.

You may also pass some `style` to style the `div`<img src="../res/dom-badge.png" height=15> or `View` <img src="../res/native-badge.png" height=15> which `LookRoot` creates. Otherwise you might see sideeffects as this div is wrapping your whole application.

## Usage
<img src="../res/dom-badge.png" height=25>
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
<br>
<img src="../res/native-badge.png" height=25>
```javascript
import { Native: { LookRoot }, Presets, Plugins } from 'react-look'
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
