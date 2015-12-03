import React from 'react'
import Overview from './components/Overview.jsx'
import GlobalStylesheet from './utils/GlobalStylesheet'
import { Presets } from '../lib/addons'

export default (props) => <Overview {...props} lookConfig={Presets['react-dom']} />
