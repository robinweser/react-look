import React from 'react'
import { render } from 'react-dom'
import { StyleSheet, LookRoot, Presets, Plugins } from '../modules'

import App from './app.jsx'

StyleSheet.toCSS({
  '*': {
    padding: 0,
    margin: 0,
    fontFamily: '"Lato", sans-serif',
    fontWeight: 300,
    boxSizing: 'border-box',
    userSelect: 'none'
  }
})

const config = Presets['react-dom'];
config.styleElementId = '_look'

// config.plugins.push(Plugins.friendlyClassName)
// config.plugins.push(Plugins.styleLogger)
// config.styleLogger = {
//  onEvent: 'onClick',
//  onlyTopMost: true,
//  noEmpty: true
// }

render(
  <LookRoot config={config}>
    <App />
  </LookRoot>,
  document.getElementById('app'))
