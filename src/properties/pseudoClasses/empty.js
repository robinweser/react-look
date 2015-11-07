// Evaluates if an element is empty / got no children at all
export default (property, styles, customKey, {newProps}) => {
  return !newProps.children || (newProps.children && newProps.children.length < 1) ? styles : false
}
