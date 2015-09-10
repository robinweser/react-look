import mixinTypes from '../utils/mixinTypes'

export default [{
	key: 'css',
	type: mixinTypes.EQUAL,
	fn: extractCSS
}]

export function extractCSS(key, className, args) {
	let newProps = args.newProps
	if (newProps.hasOwnProperty('className')) {
		newProps.className += ' ' + className
	} else {
		newProps.className = className
	}
}