import assign from 'object-assign'
import mixinTypes from '../utils/mixinTypes'
import isNumber from '../utils/isNumber'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
export default [{
	key: '>=',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '>=', args.Component)
		return evaluation && evaluation[0] >= evaluation[1] ? styles : false
	}
}, {
	key: '<=',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '<=', args.Component)
		return evaluation && evaluation[0] <= evaluation[1] ? styles : false
	}
}, {
	key: '!=',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '!=', args.Component)
		return evaluation && evaluation[0] != evaluation[1] ? styles : false
	}
}, {
	key: '>',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '>', args.Component)
		return evaluation && evaluation[0] > evaluation[1] ? styles : false
	}
}, {
	key: '<',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '<', args.Component)
		return evaluation && evaluation[0] < evaluation[1] ? styles : false
	}
}, {
	key: '=',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		let evaluation = splitExpression(key, '=', args.Component)
		return evaluation && evaluation[0] == evaluation[1] ? styles : false
	}
}]

/** 
 * Splits an expression at a given operator and returns both values converted to compare them with ease 
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */
export function splitExpression(key, operator, Component) {
	let matchValues = assign({}, Component.props, Component.state)

	let [property, value] = key.split(operator)
	if (matchValues.hasOwnProperty(property)) {
		let match = matchValues[property] === undefined ? 'undefined' : matchValues[property]

		if (!isNumber(match)) {
			match = match.toString()
		}
		return [match, value]
	} else {
		return false
	}
}