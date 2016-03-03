import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import StyleContainer from '../../modules/api/StyleContainer'

describe('Subscribing to the StyleContainer', () => {
  it('should add a listener', () => {
    const subscriber = sinon.spy()
    StyleContainer.subscribe(subscriber)
    expect(StyleContainer._listener.has(subscriber)).to.eql(true)
  })

  it('should return an unsubscribe method', () => {
    const subscriber = sinon.spy()
    const subscription = StyleContainer.subscribe(subscriber)
    expect(subscription.unsubscribe instanceof Function).to.eql(true)
  })

  it('should execute subscription on change', () => {
    const subscriber = sinon.spy()
    StyleContainer.subscribe(subscriber)
    StyleContainer.add('s0', { color: 'red' })

    expect(subscriber).to.have.been.calledOnce
  })

  it('should unsubscribe', () => {
    const subscriber = sinon.spy()
    const subscription = StyleContainer.subscribe(subscriber)
    subscription.unsubscribe()
    expect(StyleContainer._listener.has(subscriber)).to.eql(false)
  })
})

describe('Requesting a selector', () => {
  it('should return a new unused selector', () => {
    const firstSelector = StyleContainer.requestSelector()
    const secondSelector = StyleContainer.requestSelector()

    expect(firstSelector).to.eql('s0')
    expect(secondSelector).to.eql('s1')
  })

  it('should use a custom prefix', () => {
    expect(StyleContainer.requestSelector('prefix')).to.eql('prefix0')
  })
})
