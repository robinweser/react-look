/**
* Evaluates if the correct language is given
*/
export default (property, value, customKey, {newProps}) => {
  return newProps.lang && customKey.indexOf(newProps.lang) > -1 ? styles : false
}