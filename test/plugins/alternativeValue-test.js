import alternativeValue from '../../lib/plugins/alternativeValue'
import { expect } from 'chai'


describe('Resolving alternative values', () => {

  it('should concat alternative values', () => {
    expect(alternativeValue({display: ['-webkit-flex', 'flex']})).to.eql({
      display: '-webkit-flex;display:flex'
    })
  })

  it('should use param-case', () => {
    expect(alternativeValue({
      alternativeValues: ['value1', 'value2']
    })).to.eql({alternativeValues: 'value1;alternative-values:value2'})
  })
})