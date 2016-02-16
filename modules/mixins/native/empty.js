// Evaluates if an element is empty / got no children at all
export default ({ value, newProps }) => {
  return !newProps.children || (newProps.children && newProps.children.length < 1) ? value : false
}
