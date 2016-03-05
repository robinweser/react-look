import Prefixer from '../../modules/api/Prefixer'

describe('Using the basic Prefixer interface', () => {
  it('should set a Look Prefixer flag', () => {
    expect(new Prefixer()._isLookPrefixer).to.eql(true)
  })

  it('should just return styles on prefix', () => {
    const styles = { display: 'flex' }
    expect(new Prefixer().prefix(styles)).to.eql(styles)
  })

  it('should just return an empty string as keyframes prefix', () => {
    expect(new Prefixer().getKeyframesPrefix()).to.eql([ '' ])
  })
})
