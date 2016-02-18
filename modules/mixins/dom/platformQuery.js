import prefixer from '../../utils/prefixer'

// Allows the use of platform queries supported by browser information
// provided by the inline-style-prefixer
export default ({ property, value, mixinKey, config: { userAgent } }) => {
  const browserInfo = prefixer(userAgent)._browserInfo
  const platforms = property.replace(mixinKey, '').trim().split(' ')

  let isPlatform = false

  platforms.forEach(platform => {
    if (browserInfo[platform.trim()]) {
      isPlatform = true
    }
  })

  return isPlatform ? value : false
}
