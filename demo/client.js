import React from 'react'
import { render } from 'react-dom'
import { Presets } from '../lib/addons'

import App from './app.jsx'

render(<App lookConfig={Presets['react-dom']} />, document.getElementById('app'))
