import extend from '../../modules/mixins/extend'
import { expect } from 'chai'

describe('Extending styles', () => {

  it('should not do anything if no styles are passed', () => {
    let extended = extend({
      property: 'extend',
      value: {},
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({ })
  })


  it('should return whole obj if no condition and no styles are passed', () => {
    let extended = extend({
      property: 'extend',
      value: {
        color: 'blue',
        fontSize: 15
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({ color: 'blue', fontSize: 15 })
  })


  it('should return styles if no condition is passed', () => {
    let extended = extend({
      property: 'extend',
      value: {
        styles: {
          color: 'blue',
          fontSize: 15
        }
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({ color: 'blue', fontSize: 15 })
  })


  it('should not styles if no condition is not fulfilled', () => {
    let extended = extend({
      property: 'extend',
      value: {
        styles: {
          color: 'blue',
          fontSize: 15
        },
        condition: (true == false)
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.equal(undefined)
  })


  it('should not styles if no condition is not fulfilled', () => {
    let extended = extend({
      property: 'extend',
      value: {
        styles: {
          color: 'blue',
          fontSize: 15
        },
        condition: (true == true)
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({ color: 'blue', fontSize: 15 })
  })


  it('should merge styles if an array is passed', () => {
    let extended = extend({
      property: 'extend',
      value: {
        styles: [ {
          color: 'blue',
          fontSize: 15
        }, {
          lineHeight: 10
        } ]
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({
      color: 'blue',
      fontSize: 15,
      lineHeight: 10
    })
  })


  it('should overwrite existing values while merging styles', () => {
    let extended = extend({
      property: 'extend',
      value: {
        styles: [ {
          color: 'blue',
          fontSize: 15
        }, {
          fontSize: 10
        } ]
      },
      mixinKey: 'extend',
      newProps: {}
    })
    expect(extended).to.eql({ color: 'blue', fontSize: 10 })
  })
})
