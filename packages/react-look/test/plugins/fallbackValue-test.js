import fallbackValue from '../../modules/plugins/fallbackValue'
import { resolvePlugins } from '../../../common/modules/core/resolver'


describe('Resolving fallback values', () => {
  it('should concat fallback values', () => {
    expect(fallbackValue({
      styles: {
        display: [ '-webkit-flex', 'flex' ]
      }
    })).to.eql({ display: '-webkit-flex;display:flex' })
  })

  it('should use param-case', () => {
    expect(fallbackValue({
      styles: {
        fallbackValues: [ 'value1', 'value2' ]
      }
    })).to.eql({ fallbackValues: 'value1;fallback-values:value2' })
  })

  it('should resolve nested objects', () => {
    expect(fallbackValue({
      styles: {
        fallbackValues: {
          property: [ 'value1', 'value2' ]
        }
      },
      config: {
        plugins: [ fallbackValue ]
      },
      resolve: resolvePlugins
    })).to.eql({
      fallbackValues: {
        property: 'value1;property:value2'
      }
    })
  })
})
