import Look from './core'

import State from './api/State'
import StyleSheet from './api/StyleSheet'
import Listener from './api/Listener'

import config from './preconfig/native'

export default (...args) => {
	return Look(...args, config)
}

export {
	Listener,
	State,
	StyleSheet
}
