// Returns the font format for a specific font source
export default src => {
  if (src === undefined || typeof src !== 'string') {
    return false
  }

  const formats = {
    '.woff': 'woff',
    '.eof': 'eof',
    '.ttf': 'truetype',
    '.svg': 'svg'
  }

  let format
  Object.keys(formats).forEach(extension => {
    if (src.indexOf(extension) > -1) {
      format = formats[extension]
    }
  })

  return format
}
