/**
 * Checks if any vendor prefixes are passed manually
 */
export default (styles, {Component}) => {
  const checkProps = styleObject => {
    const jsPrefixes = ['Webkit', 'Moz', 'O', 'ms']
    const cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-']
    const loggerPrefix = Component._lookScope + ':'

    Object.keys(styleObject).forEach(property => {
      const value = styleObject[property]
      if (value instanceof Object) {
        checkProps(value)
      } else {
        let i
        for (i = 0; i < jsPrefixes.length; ++i) {
          if (property.indexOf(jsPrefixes[i]) === 0) {
            console.log(loggerPrefix, 'Found prefixed property [' + property + ']. Vendor prefixes are not necessary.')
          } else if (typeof value === 'string' && value.indexOf(cssPrefixes[i]) > -1) {
            console.log(loggerPrefix, 'Found prefixed value [' + value + ']. Vendor prefixes are not necessary.')
          }
        }
      }
    })
  }

  checkProps(styles)

  return styles
}
