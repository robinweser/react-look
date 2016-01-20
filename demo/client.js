import React from 'react'
import { render } from 'react-dom'
import { Presets, DevTools } from '../lib/addons'
import { Plugins } from 'inline-style-linter'

import App from './app.jsx'

const config = Presets['react-dom'];
/*
config.plugins.push(DevTools.linter)

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

config.userAgent = navigator.userAgent

render(<App lookConfig={config} />, document.getElementById('app'))
