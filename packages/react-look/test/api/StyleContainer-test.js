import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import StyleContainer from '../../modules/api/StyleContainer'
import StyleSheet from '../../modules/api/StyleSheet'

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

describe('Adding a static css string', () => {
  it('should add it to the statics set', () => {
    const css = '.h1 { color: red }'
    StyleContainer.addStatic(css)
    expect(StyleContainer.statics.has(css)).to.eql(true)
  })
})

describe('Generating a className', () => {
  it('should return a content hash which is unique to a given set of styles', () => {
    const stylesA = { color: 'red', backgroundColor: 'blue' }
    const stylesB = { backgroundColor: 'blue', color: 'red' }
    const stylesC = { backgroundColor: 'blue', color: 'blue' }

    expect(StyleContainer.generateClassName(stylesA)).to.eql(StyleContainer.generateClassName(stylesB))
    expect(StyleContainer.generateClassName(stylesB)).to.not.eql(StyleContainer.generateClassName(stylesC))
    expect(StyleContainer.generateClassName(stylesA)).to.not.eql(StyleContainer.generateClassName(stylesC))
  })
})

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
