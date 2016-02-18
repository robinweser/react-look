import StyleContainer from '../../../modules/api/dom/StyleContainer'
import StyleSheet from '../../../modules/api/dom/StyleSheet'
import Chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import jsdom from 'jsdom'
Chai.use(sinonChai)

describe('Rendering static styles', () => {
  it('should return a single string containing the whole css', () => {
    StyleSheet.create({
      box: {
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      }
    })
    const css = '.c0{color:red}@media(min-height: 300px){.c0{color:blue}}'
    expect(StyleContainer.renderStaticStyles()).to.eql(css)
  })
})

describe('Subscribing to the style StyleContainer', () => {
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
    StyleContainer.add('.bla', { color: 'red' })

    expect(subscriber).to.have.been.calledOnce
  })

  it('should unsubscribe', () => {
    const subscriber = sinon.spy()
    const subscription = StyleContainer.subscribe(subscriber)
    subscription.unsubscribe()
    expect(StyleContainer._listener.has(subscriber)).to.eql(false)
  })
})
