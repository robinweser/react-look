// Lets you extract css to classNames using the css key
// This is helpful if you have some legacy code using CSS classes
export default ({ value: className, newProps }) => {
  if (newProps.className) {
    newProps.className += ' ' + className
  } else {
    newProps.className = className
  }
  return true
}
