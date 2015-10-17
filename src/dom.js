import CSS from './api/CSS'

import Look, {createStyleSheet} from './core'
import State from './api/State'
import Listener from './api/Listener'

import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import customProperty from './plugins/customProperty'

import {equal, unEqual, bigger, smaller, biggerThan, smallerThan} from './keys/condition'
import {firstChild, lastChild, onlyChild, nthChild, nthLastChild} from './keys/pseudoClasses/childIndex'
import {firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType} from './keys/pseudoClasses/childTypeIndex'
import {checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate} from './keys/pseudoClasses/input'
import {hover, active, focus} from './keys/pseudoClasses/userAction'
import {before, after} from './keys/pseudoClasses/beforeAfter'
import lang from './keys/pseudoClasses/lang'
import empty from './keys/pseudoClasses/empty'
import extractCSS from './keys/extractCSS'
import extend from './keys/extend'
import mediaQuery from './keys/mediaQuery'

const config = {
	plugins : [customProperty, alternativeValue, statefulValue],
	keys: {
		//NOTE: Ordner matters! 
		'>=': biggerThan,
		'<=': smallerThan,
		'!=': unEqual,
		'>': bigger,
		'<': smaller,
		'=': equal,
		extend: extend,
		css: extractCSS,
		':empy': empty,
		'@media': mediaQuery,
		':first-child': firstChild,
		':last-child': lastChild,
		':only-child': onlyChild,
		':nth-child': nthChild,
		':nth-last-child': nthLastChild,
		':first-of-type': firstOfType,
		':last-of-type': lastOfType,
		':only-of-type': onlyOfType,
		':nth-of-type': nthOfType,
		':nth-last-of-type': nthLastOfType,
		':before': before,
		':after': after,
		':lang': lang,
		':hover': hover,
		':focus': focus,
		':active': active,
		':checked': checked,
		':disabled': disabled,
		':enabled': enabled,
		':read-only': readOnly,
		':read-write': readWrite,
		':required': required,
		':optional': optional,
		':indeterminate': indeterminate
	}
}
export default (...args) => {
	return Look(...args, config)
}

export {
	CSS,
	State,
	Listener,
	createStyleSheet
}