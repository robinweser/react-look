import CSSContainer from '../utils/CSSContainer'
import generateClassName from '../utils/generateClassName'

export function renderStaticStyles(styles) {
  const staticStyles = Object.keys(styles).reduce((output, property) => {
    const value = styles[property]
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Array) {
      output[property] = styles[property]
      delete styles[property]
    }
    return output;
  }, {})

  return generateClassName(staticStyles)
}

export function create(comp, styles) {
  if (!styles || Object.keys(styles).length < 1) {
    warn('WRONG INPUT')
    return false
  }

  return Object.keys(styles).reduce((output, selector) => {
    const selectorStyles = styles[selector]; // eslint-disable-line
    const className = renderStaticStyles(selectorStyles)

    output[selector] = {}

    if (className) {
      output[selector].className = className
    }
    if (Object.keys(selectorStyles).length > 0) {
      output[selector].look = selectorStyles
    }
    return output; // eslint-disable-line
  }, {})
}
