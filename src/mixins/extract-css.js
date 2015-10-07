import MixinTypes from '../utils/MixinTypes'

/**
 * Lets you extract css to classNames using the css key
 * This is helpful if you have some legacy code using CSS classes
 */
export default [{
  key: 'css',
  type: MixinTypes.EQUAL,
  fn: (key, className, args) => {
    let newProps = args.newProps
    if (newProps.hasOwnProperty('className')) {
      newProps.className += ' ' + className
    } else {
      newProps.className = className
    }
  }
}]