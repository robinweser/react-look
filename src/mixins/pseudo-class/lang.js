import mixinTypes from '../../utils/mixinTypes'

/**
* Evaluates if the correct language is given
*/
export default [{
	key: ':lang',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		return args.newProps.lang && key.indexOf(args.newProps.lang) > -1 ? styles : false
	}
}]