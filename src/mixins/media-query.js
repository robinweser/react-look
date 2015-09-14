import MixinTypes from '../utils/MixinTypes'

/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 */
export default [{
	key: '@media',
	type: MixinTypes.BEGINWITH,
	fn: (key, styles, args) => {
		//Check if browser supports window.matchMedia
		let matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined
		if (matchMedia !== undefined) {
			if (!args.Component._mediaQueryListener) {
				args.Component._mediaQueryListener = true
				window.addEventListener('resize', () => {
					args.Component.forceUpdate()
				})
			}
			
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