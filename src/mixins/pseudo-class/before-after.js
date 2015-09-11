import mixinTypes from '../../utils/mixinTypes'
import createPseudoElement from '../../utils/createPseudoElement'

/**
 * Adds a element before/after current element
 * Uses mixinTypes.INCLUDE to cover both :before/:after as well as ::before/::after
 */
export default [{
	key: ':before',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		if (args.newProps.hasOwnProperty('children')) {
			args.newProps.children.unshift(createPseudoElement(styles))
		}
	}
}, {
	key: ':after',
	type: mixinTypes.INCLUDE,
	fn: (key, styles, args) => {
		if (args.newProps.hasOwnProperty('children')) {
			args.newProps.children.push(createPseudoElement(styles))
		}
	}
}]