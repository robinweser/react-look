import React from 'react'
import { render } from 'react-dom'
import { Presets, DevTools } from '../lib/addons'
import { Plugins } from 'inline-style-linter'

import App from './app.jsx'

const config = Presets['react-dom'];
// config.plugins.push(DevTools.linter)

config.linter = {
  plugins: [
    Plugins.preferNumber,
    // Plugins.shorthandLonghand,
    Plugins.noInitialValue,
    Plugins.compatibility
  ],
  compatibility: {},
  onlyLogHint: true
}

config.userAgent = navigator.userAgent

render(<App lookConfig={config} />, document.getElementById('app'))
