// Returns the font format for a specific font source
export default src => {
  let format

  if (src === undefined || typeof src !== 'string') {
    return false
  }

  if (src.indexOf('.woff') > -1) {
    format = 'woff'
  } else if (src.indexOf('.eof') > -1) {
    format = 'eof'
  } else if (src.indexOf('.ttf') > -1) {
    format = 'truetype'
  } else if (src.indexOf('.svg') > -1) {
    format = 'svg'
  }

  return format
}
