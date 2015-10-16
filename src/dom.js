import CSS from './api/CSS'

import Look from './core'
import StyleSheet from './api/StyleSheet'
import State from './api/State'
import Listener from './api/Listener'

import config from './preconfig/dom'

export default (...args) => {
	return Look(...args, config)
}

export {
	CSS,
	State,
	Listener,
	StyleSheet
}
