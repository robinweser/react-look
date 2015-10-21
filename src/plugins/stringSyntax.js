import assignStyles from 'object-assign'

/**
* This plugin is only for legacy code to support the old syntax
* It also extracts styles attached to Components directly
*/
export default (styles, scopeArgs, config) => {
  let {Component, element} = scopeArgs

  if (Component.styles) {
    console.warn('The string syntax look="' + element.props.look + '" within ' + Component._lookScope + ' is deprecated. Please use direct mapping instead. This will be removed in Version 1.0.0.')
    styles = extractStyles(element.props, Component.styles)
  }

  return styles
}


/**
 * Extracts referenced styles to an elements props
 * @param {Object} props - elements props that will be assigned
 * @param {Object} styles - a valid style object
 */
const extractStyles = (props, styles) => {
  if (props.hasOwnProperty('look')) {
    // Resolve look shortcut _default and map referenced styles
    if (props.look === true) {
      return styles
    }

    let extracted = {}
    // Splits look to resolve multiple looks
    // Reverse to loop backwards in order to resolve with priority
    const lookList = props.look.split(' ').reverse()

    lookList.forEach(look => {
      // Reduce if look is existing otherwise throw a warning
      if (styles.hasOwnProperty(look)) {
        extracted = assignStyles({}, styles[look], extracted)
      } else {
        console.warn('Assigned look does not exist and will be ignored.')
        console.warn('Provided styles: ' + JSON.stringify(styles) + ' do not include ' + look)

        return false
      }
    })

    return extracted
  }

  return false
}