// Evaluates if an element is blank but not empty
export default (property, styles, customkey, {newProps}) => {
  return newProps.children !== undefined && typeof newProps.children === 'string' && newProps.children !== '' && newProps.children.trim() === '' ? styles : false
}
