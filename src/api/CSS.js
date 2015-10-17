import { CSSSheet, Processors } from 'dynamic-style-sheets'

const Units = Processors.Units

/**
 *  A global StyleSheet that directly applies to your DOM.
 */
export default class CSS extends CSSSheet {
  /**
   * @param {Object} styles - a key-value map with valid CSS Rules
   * @param {string} unit - a valid unit that gets applied
   * @param {string} media - a valid media query
   * @param {any} id - a special id that gets attached to the stylesheet in order catch it later
   */
  constructor( styles, unit = 'px', scope = '', media = '', id ) {
    let selector

    if ( scope !== '' ) {
      for ( selector in styles ) {
        if ( styles.hasOwnProperty(selector) ) {
          styles[scope + ' ' + selector] = styles[selector]
          delete styles[selector]
        }
      }
    }

    super(styles, media, id)

    this.process(Units, this.unit)
    this.unit = unit
  }

  process() {
    super.process(...arguments)
    super.process(Units, this.unit)
  }
}
