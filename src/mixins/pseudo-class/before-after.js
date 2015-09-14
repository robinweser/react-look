import MixinTypes from '../../utils/MixinTypes'
import createPseudoElement from '../../utils/createPseudoElement'

/**
 * Adds a element before/after current element
 * Uses MixinTypes.INCLUDE to cover both :before/:after as well as ::before/::after
 */
export default [{
	key: ':before',
	type: MixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		if (args.newProps.hasOwnProperty('children')) {
			args.newProps.children.unshift(createPseudoElement(styles))
		}
	}
}, {
	key: ':after',
	type: MixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		if (args.newProps.hasOwnProperty('children')) {
			args.newProps.children.push(createPseudoElement(styles))
		}
	}
}]