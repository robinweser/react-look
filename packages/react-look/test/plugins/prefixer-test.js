import prefixer from '../../modules/plugins/prefixer'

describe('Resolving prefixer plugin', () => {

  it('should return prefixed styles', () => {
    const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'

    expect(prefixer({
      styles: {
        appearance: 'test'
      },
      config: {
        userAgent: Chrome45
      }
    })).to.eql({ WebkitAppearance: 'test' })
  })
})
