import StaticPrefixer from '../../modules/prefixer/StaticPrefixer'

describe('Statically prefixing styles', () => {
  it('should return prefixed styles', () => {

    expect(new StaticPrefixer().prefix({ appearance: 'test' })).to.eql({
      WebkitAppearance: 'test',
      MozAppearance: 'test',
      appearance: 'test'
    })
  })

  it('should return all prefixes needed for keyframes', () => {
    expect(new StaticPrefixer().getKeyframesPrefix()).to.eql([ '-webkit-', '-moz-', '' ])
  })
})
