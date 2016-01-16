import throttle from '../../modules/utils/throttle'
import Chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

describe('Throttling a function', () => {
  it('should only be called once every 200ms', () => {
    const fn = sinon.spy()
    const test = throttle(fn, 200)
    test()
    test()
    expect(fn).to.have.been.calledOnlyOnce
  })
})
