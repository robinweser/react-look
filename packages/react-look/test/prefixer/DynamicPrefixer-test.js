import DynamicPrefixer from '../../modules/prefixer/DynamicPrefixer'

describe('Dynamically prefixing styles', () => {
  it('should return prefixed styles', () => {
    const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'

    expect(new DynamicPrefixer({ userAgent: Chrome45 }).prefix({
      appearance: 'test'
    })).to.eql({ WebkitAppearance: 'test' })
  })

  it('should return the prefix needed for keyframes', () => {
    const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'

    expect(new DynamicPrefixer({ userAgent: Chrome45 }).getKeyframesPrefix()).to.eql([ '-webkit-' ])
  })

  it('should also keep unprefixed keyframes', () => {
    const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'

    expect(new DynamicPrefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).getKeyframesPrefix()).to.eql([ '-webkit-', '' ])
  })
})
