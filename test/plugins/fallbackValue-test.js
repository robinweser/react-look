import fallbackValue from '../../modules/plugins/fallbackValue'
import { expect } from 'chai'


describe('Resolving alternative values', () => {

  it('should concat alternative values', () => {
    expect(fallbackValue({
      display: [ '-webkit-flex', 'flex' ]
    })).to.eql({ display: '-webkit-flex;display:flex' })
  })

  it('should use param-case', () => {
    expect(fallbackValue({
      alternativeValues: [ 'value1', 'value2' ]
    })).to.eql({
      alternativeValues: 'value1;alternative-values:value2'
    })
  })

  it('should resolve nested objects', () => {
    expect(fallbackValue({
      alternativeValues: {
        property: [ 'value1', 'value2' ]
      }
    })).to.eql({
      alternativeValues: {
        property: 'value1;property:value2'
      }
    })
  })
})
