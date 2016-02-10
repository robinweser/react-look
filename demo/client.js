import React from 'react'
import { render } from 'react-dom'
import { Presets, Plugins } from '../modules/addons'
import { Plugins } from 'inline-style-linter'
import { StyleSheet, LookRoot } from '../modules/look'

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
config.plugins.push(Plugins.styleLogger)
config.styleLogger = { onEvent: 'onMouseEnter', onlyTopMost: true }
/*
config.plugins.push(Plugins.linter)

config.linter = {
  plugins: [
    Plugins.preferNumber,
    // Plugins.shorthandLonghand,
    Plugins.noInitialValue,
    Plugins.compatibility
  ],
  compatibility: {
    targetBrowser: {
      android: 4,
      ios_saf: 7,
      safari: 7,
      chrome: 30,
      firefox: 30,
      edge: 12,
      ie: 9
    },
    partial: true
  },
  onlyLogHint: true
}
*/

render(
  <LookRoot config={config}>
    <App />
  </LookRoot>,
  document.getElementById('app'))
