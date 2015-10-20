/**
 * Lets you extract css to classNames using the css key
 * This is helpful if you have some legacy code using CSS classes
 */
export default (property, className, customKey, {newProps}) => {
  if (newProps.hasOwnProperty('className')) {
    newProps.className += ' ' + className
  } else {
    newProps.className = className
  }
}