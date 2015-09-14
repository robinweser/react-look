import MixinTypes from '../../utils/MixinTypes'

/**
* Evaluates if the correct language is given
*/
export default [{
	key: ':lang',
	type: MixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		return args.newProps.lang && key.indexOf(args.newProps.lang) > -1 ? styles : false
	}
}]