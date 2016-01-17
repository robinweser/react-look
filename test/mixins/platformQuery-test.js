import platformQuery from '../../modules/mixins/platformQuery'
import { expect } from 'chai'

describe('Resolving platform queries', () => {
  it('should return true', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery('@platform ios', true, '@platform', { }, {
      userAgent: iOSUserAgent
    })).to.eql(true)
  })

  it('should return if at least one platform is true', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery('@platform android ios', true, '@platform', { }, {
      userAgent: iOSUserAgent
    })).to.eql(true)
  })

  it('should false', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery('@platform android', true, '@platform', { }, {
      userAgent: iOSUserAgent
    })).to.eql(false)
  })
})
