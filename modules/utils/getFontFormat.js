const formats = {
  '.woff': 'woff',
  '.eof': 'eof',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

// Returns the font format for a specific font source
export default function getFontFormat(src) {
  for (let i = 0; i < formats.length; ++i) {
    if (src.indexOf(extension) > -1) {
      return formats[extension]
    }
  }
}
