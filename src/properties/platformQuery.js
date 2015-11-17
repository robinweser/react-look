import prefixer from '../utils/prefixer'

// Allows the use of platform queries supported by browser information
// provided by the inline-style-prefixer
export default (property, styles, customKey, scopeArgs, {userAgent}) => {
  const browserInfo = prefixer(userAgent)._browserInfo
  const platform = property.replace(customKey, '').trim()

  return browserInfo[platform] ? styles : false
}
