import { expect } from 'chai'
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../lib/keys/condition'

describe('Evaluating conditions', () => {
  let args = {
    Component: {
      props: {
        highlight: true,
        clicks: 20,
        noprop: undefined,
        error: null
      },
      state: {}
    }
  }

  it('should validate true', () => {
    expect(equal('highlight=true', true, '=', args)).to.equal(true)
    expect(greater('clicks>10', true, '>', args)).to.equal(true)
    expect(unEqual('clicks!=15', true, '!=', args)).to.equal(true)
    expect(greaterThan('clicks>=20', true, '>=', args)).to.equal(true)
    expect(greaterThan('clicks>=19', true, '>=', args)).to.equal(true)
    expect(equal('noprop=undefined', true, '=', args)).to.equal(true)
    expect(unEqual('clicks!=undefined', true, '!=', args)).to.equal(true)
    expect(equal('error=null', true, '=', args)).to.equal(true)
  })


  it('should validate false', () => {
    expect(less('clicks<10', true, '<', args)).to.equal(false)
    expect(equal('border=2px', true, '=', args)).to.equal(false)
    expect(unEqual('clicks!=20', true, '!=', args)).to.equal(false)
    expect(lessThan('clicks<=10', true, '<=', args)).to.equal(false)
    expect(equal('highlight=undefined', true, '=', args)).to.equal(false)
    expect(equal('error=undefined', true, '=', args)).to.equal(false)
  })
})
