import mixin from '../../modules/plugins/mixin'
import { expect } from 'chai'


describe('Resolving mixins', () => {

  it('should return styles if no mixins are passed', () => {
    expect(mixin({ }, { }, { })).to.eql({ })
  })

  it('should return styles if mixins is empty', () => {
    expect(mixin({ }, { }, {
      mixins: { }
    })).to.eql({ })
  })

  it('should resolve mixins', () => {
    const styles = { color: 'red', testMixin: 'blue' }
    const config = {
      mixins: {
        testMixin(p, v, k, s, c) {
          return { fontSize: 14 }
        }
      }
    }
    expect(mixin(styles, { }, config)).to.eql({
      color: 'red',
      fontSize: 14
    })
  })
})
