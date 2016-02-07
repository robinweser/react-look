import platformQuery from '../../modules/mixins/platformQuery'
import { expect } from 'chai'

describe('Resolving platform queries', () => {
  it('should return true', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery({
      property: '@platform ios',
      value: true,
      mixinKey: '@platform',
      config: {
        userAgent: iOSUserAgent
      }
    })).to.eql(true)
  })

  it('should return if at least one platform is true', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery({
      property: '@platform android ios',
      value: true,
      mixinKey: '@platform',
      config: {
        userAgent: iOSUserAgent
      }
    })).to.eql(true)
  })

  it('should false', () => {
    const iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
    expect(platformQuery({
      property: '@platform android',
      value: true,
      mixinKey: '@platform',
      config: {
        userAgent: iOSUserAgent
      }
    })).to.eql(false)
  })
})
