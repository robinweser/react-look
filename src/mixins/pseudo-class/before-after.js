import createPseudoElement from '../../utils/createPseudoElement'
import MixinTypes          from '../../utils/MixinTypes'

/**
 * Adds a element before/after current element
 * Uses MixinTypes.INCLUDE to cover both :before/:after as well as ::before/::after
 */
export default [{
  key: ':before',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { newProps } ) => {
    if ( newProps.hasOwnProperty('children') ) {
      newProps.children.unshift(createPseudoElement(styles))
    }
  }
}, {
  key: ':after',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { newProps } ) => {
    if ( newProps.hasOwnProperty('children') ) {
      newProps.children.push(createPseudoElement(styles))
    }
  }
}]
