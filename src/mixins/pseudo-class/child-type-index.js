import mixinTypes from '../../utils/mixinTypes'
import splitNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'

/**
* Evaluates if an element is empty / got no children at all
*/
export default [{
	key: ':first-of-type',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.typeIndex === 1 ? styles : false
	}
},{
	key: ':last-of-type',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.typeIndex === args.childIndexMap.typeLength ? styles : false
	}
},{
	key: ':only-of-type',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.childIndexMap.typeLength === 1 ? styles : false
	}
},{
	key: ':nth-of-type',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.typeIndex) ? styles : false
	}
}, {
	key: ':nth-last-of-type',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		let expression = splitNthExpression(key).expression
		return evalNthExpression(expression, args.childIndexMap.typeLength + 1 - args.childIndexMap.typeIndex) ? styles : false
	}
}]
