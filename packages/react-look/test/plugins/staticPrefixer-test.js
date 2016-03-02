import staticPrefixer from '../../modules/plugins/staticPrefixer'

describe('Static prefixing styles', () => {
  it('should return prefixed styles', () => {
    const styles = { appearance: 'test' }
    const prefixed = {
      WebkitAppearance: 'test',
      MozAppearance: 'test',
      appearance: 'test'
    }
    expect(staticPrefixer({ styles })).to.eql(prefixed)
  })
})
