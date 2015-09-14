import MixinTypes from '../../utils/MixinTypes'
import splitNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'

/**
 * Evaluates child index positions using data from childIndexMap
 * childIndexMap is provided by arguments
 */
export default [{
	key: ':first-child',
	type: MixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.index === 1 ? styles : false
	}
}, {
	key: ':last-child',
	type: MixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.index === args.childIndexMap.length ? styles : false
	}
}, {
	key: ':only-child',
	type: MixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.length === 1 ? styles : false
	}
}, {
	key: ':nth-child',
	type: MixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.index) ? styles : false
	}
}, {
	key: ':nth-last-child',
	type: MixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.length + 1 - args.childIndexMap.index) ? styles : false
	}
}]