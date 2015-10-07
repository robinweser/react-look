import MixinTypes from '../../utils/MixinTypes'

/**
* Evaluates if the correct language is given
*/
export default [{
  key: ':lang',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, {newProps}) => {
    return newProps.lang && key.indexOf(newProps.lang) > -1 ? styles : false
  }
}]