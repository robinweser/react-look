import MixinTypes from '../../utils/MixinTypes'

/**
* Evaluates if an element is empty / got no children at all
*/
export default [{
	key: ':empty',
	type: MixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return !args.newProps.children || args.newProps.children.length < 1 ? styles : false
	}
}]