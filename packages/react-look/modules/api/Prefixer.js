export default class Prefixer {
  constructor() {
    this._isLookPrefixer = true
  }

  prefix(styles) {
    return styles
  }

  getKeyframesPrefix() {
    return [ '' ]
  }
}
