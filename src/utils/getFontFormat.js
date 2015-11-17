// Returns the font format for a specific font source
export default src => {
  if (src.indexOf('.woff') > -1) {
    return 'woff'
  } else if (src.indexOf('.eof') > -1) {
    return 'eof'
  } else if (src.indexOf('.ttf') > -1) {
    return 'truetype'
  } else if (src.indexOf('.svg') > -1) {
    return 'svg'
  } else {
    return false
  }
}
