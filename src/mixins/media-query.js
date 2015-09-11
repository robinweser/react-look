import mixinTypes from '../utils/mixinTypes'

/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 */
export default [{
	key: '@media',
	type: mixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		//Check if browser supports window.matchMedia
		let matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined
		if (matchMedia !== undefined) {
			if (matchMedia(key.replace('@media', '').trim()).matches) {
				return styles
			} else {
				return false
			}
		} else {
			console.warn('Failed evaluating media query: ' + key + '. Your environment is not able to use window.matchMedia.');
			return false
		}
	}
}]