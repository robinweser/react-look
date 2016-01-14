// Evaluates if the correct language is given
export default (property, styles, mixinKey, { newProps }) => {
  return newProps.lang && property.indexOf(newProps.lang) > -1 ? styles : false
}
