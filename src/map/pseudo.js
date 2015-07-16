import * as Validator from '../utils/validator';

export default {
  /*
   * Adds pseudo-class information concerning a style selector
   * This helps to purposeful handle only needed pseudo-classes
   * @param {Map} pseudo - a map to store event pseudos
   * @param {string} selector - a selector which those event pseudos belong to
   * @param {string} event - pseudo-class that represents an event
   */
  addRequiredEventPseudos(pseudo, selector, event) {
      if (!pseudo.has(selector)) {
        pseudo.set(selector, new Map());
      }

      //Validates current selectors and analogous sets event reference
      if (Validator.isPseudoActive(event)) {
        this.setEventPseudo(pseudo, selector, 'active')
      } else if (Validator.isPseudoFocus(event)) {
        this.setEventPseudo(pseudo, selector, 'focus')
      } else if (Validator.isPseudoHover(event)) {
        this.setEventPseudo(pseudo, selector, 'hover')

        //only needed for inputs that need to be validated
        //Idea: Perhaps separate this from styles since it better fits the logic part, see https://github.com/rofrischmann/react-look/issues/25
      } else if (Validator.isPseudoValid(event) || Validator.isPseudoInvalid(event)) {
        this.setEventPseudo(pseudo, selector, 'change')
      }
    },

    /*
     * Sets a specific event for a given selector
     */
    setEventPseudo(pseudo, selector, event) {
      pseudo.get(selector).set(event, true);
    }
}
