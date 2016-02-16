// Evaluates if an element is blank but not empty
export default ({ value, newProps }) => {
  return newProps.children !== undefined && typeof newProps.children === 'string' && newProps.children !== '' && newProps.children.trim() === '' ? value : false
}
