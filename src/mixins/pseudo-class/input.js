import mixinTypes from '../../utils/mixinTypes'

/**
* Input pseudo mixins just validate current elements props and validate those
*/
export default [{
	key: ':checked',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.newProps.checked ? styles : false
	}
},{
	key: ':disabled',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.newProps.disabled ? styles : false
	}
},{
	key: ':enabled',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return !args.newProps.disabled ? styles : false
	}
},{
	key: ':required',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.newProps.required ? styles : false
	}
},{
	key: ':optional',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return !args.newProps.required ? styles : false
	}
},{
	key: ':read-only',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.newProps.readOnly ? styles : false
	}
},{
	key: ':read-write',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return !args.newProps.readOnly ? styles : false
	}
},{
	key: ':indeterminate',
	type: mixinTypes.EQUAL,
	fn: (key, styles, args) => {
		return args.newProps.indeterminate ? styles : false
	}
}]