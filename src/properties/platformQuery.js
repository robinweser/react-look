import Prefixer from 'inline-style-prefixer'

let prefixer = new Prefixer()

export default (property, styles, customKey, {}, {userAgent}) => {
  if (prefixer._userAgent !== userAgent) {
    prefixer = new Prefixer(userAgent)
  }

  const browserInfo = prefixer._browserInfo
  const platform = property.replace(customKey, '').trim()

  return browserInfo[platform] ? styles : false
}
