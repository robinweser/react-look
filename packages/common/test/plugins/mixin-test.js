import mixin from '../../plugins/mixin'
import { resolvePlugins } from '../../core/resolver'


describe('Resolving mixins', () => {

  it('should return styles if no mixins are passed', () => {
    expect(mixin({ config: { }, styles: { } })).to.eql({ })
  })

  it('should return styles if mixins is empty', () => {
    expect(mixin({
      config: {
        mixins: { }
      },
      styles: {}
    })).to.eql({ })
  })

  it('should correctly resolve', () => {
    const styles = { color: 'red', testMixin: 'blue' }
    const config = {
      mixins: {
        testMixin(p, v, k, s, c) {
          return { fontSize: 14 }
        }
      },
      plugins: [ mixin ]
    }

    expect(mixin({ styles, config, resolve: resolvePlugins })).to.eql({
      color: 'red',
      fontSize: 14
    })
  })
})
