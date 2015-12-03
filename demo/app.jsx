import React from 'react'
import Overview from './components/Overview.jsx'
import GlobalStylesheet from './utils/GlobalStylesheet'
import { Presets, Plugins } from '../lib/addons'

const config = Presets['react-dom'];
config.plugins.push(Plugins.styleLogger)
config.styleLogger = {onHover: true, onlyTopMost: true}

export default (props) => <Overview {...props} lookConfig={config} />
