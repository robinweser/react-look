import React from 'react'
import Overview from './components/Overview.jsx'
import GlobalStylesheet from './utils/GlobalStylesheet'
import { Presets, DevTools } from '../lib/addons'

const config = Presets['react-dom'];
config.plugins.push(DevTools.styleLogger)
config.plugins.unshift(DevTools.noVendorPrefixes)
config.styleLogger = {onClick: true, onlyTopMost: true}

export default (props) => <Overview {...props} lookConfig={config} />
