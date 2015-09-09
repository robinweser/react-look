import assign from 'object-assign'
import mixinTypes from '../utils/mixinTypes'
import isNumber from '../utils/isNumber'

export default [{
	key: '>=',
	type: mixinTypes.INCLUDE,
	fn: greaterThan
}, {
	key: '>',
	type: mixinTypes.INCLUDE,
	fn: greater
}, {
	key: '<',
	type: mixinTypes.INCLUDE,
	fn: less
}, {
	key: '<=',
	type: mixinTypes.INCLUDE,
	fn: lessThan
}, {
	key: '=',
	type: mixinTypes.INCLUDE,
	fn: equal
}, {
	key: '!=',
	type: mixinTypes.INCLUDE,
	fn: unEqual
}]

export function evalExpression(key, operator, Component) {
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

export function greaterThan(key, styles, args) {
	let evaluation = evalExpression(key, '>=', args.Component)
	return evaluation && evaluation[0] >= evaluation[1] ? styles : false
}

export function greater(key, styles, args) {
	let evaluation = evalExpression(key, '>', args.Component)
	return evaluation && evaluation[0] > evaluation[1] ? styles : false
}

export function less(key, styles, args) {
	let evaluation = evalExpression(key, '<', args.Component)
	return evaluation && evaluation[0] < evaluation[1] ? styles : false
}

export function lessThan(key, styles, args) {
	let evaluation = evalExpression(key, '<=', args.Component)
	return evaluation && evaluation[0] <= evaluation[1] ? styles : false
}

export function equal(key, styles, args) {
	let evaluation = evalExpression(key, '=', args.Component)
	return evaluation && evaluation[0] == evaluation[1] ? styles : false
}

export function unEqual(key, styles, args) {
	let evaluation = evalExpression(key, '!=', args.Component)
	return evaluation && evaluation[0] != evaluation[1] ? styles : false
}