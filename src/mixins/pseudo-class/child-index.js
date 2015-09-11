import mixinTypes from '../../utils/mixinTypes'
import splitNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'

/**
* Evaluates if an element is empty / got no children at all
*/
export default [{
	key: ':first-child',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.index === 1 ? styles : false
	}
},{
	key: ':last-child',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.index === args.childIndexMap.length ? styles : false
	}
},{
	key: ':only-child',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.length === 1 ? styles : false
	}
},{
	key: ':nth-child',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.index) ? styles : false
	}
}, {
	key: ':nth-last-child',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.length + 1 - args.childIndexMap.index) ? styles : false
	}
}]
