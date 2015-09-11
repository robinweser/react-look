import mixinTypes from '../utils/mixinTypes'

/**
 * Lets you extract css to classNames using the css key
 * This is helpful if you have some legacy code using CSS classes
 */
export default [{
	key: 'css',
	type: mixinTypes.EQUAL,
	fn: (key, className, args) => {
		let newProps = args.newProps
		if (newProps.hasOwnProperty('className')) {
			newProps.className += ' ' + className
		} else {
			newProps.className = className
		}
	}
}]