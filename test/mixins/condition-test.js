import { expect } from 'chai'
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../modules/mixins/condition'

describe('Evaluating conditions', () => {
  const Component = {
    props: {
      highlight: true,
      clicks: 20,
      noprop: undefined,
      error: null,
      location: {
        pathname: '/'
      }
    },
    state: {}
  }

  it('should validate true', () => {
    expect(equal({
      property: 'highlight=true',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(true)
    expect(greater({
      property: 'clicks>10',
      value: true,
      mixinKey: '>',
      Component
    })).to.equal(true)
    expect(unEqual({
      property: 'clicks!=15',
      value: true,
      mixinKey: '!=',
      Component
    })).to.equal(true)
    expect(greaterThan({
      property: 'clicks>=20',
      value: true,
      mixinKey: '>=',
      Component
    })).to.equal(true)
    expect(greaterThan({
      property: 'clicks>=19',
      value: true,
      mixinKey: '>=',
      Component
    })).to.equal(true)
    expect(equal({
      property: 'noprop=undefined',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(true)
    expect(unEqual({
      property: 'clicks!=undefined',
      value: true,
      mixinKey: '!=',
      Component
    })).to.equal(true)
    expect(equal({
      property: 'error=null',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(true),
    expect(equal({
      property: 'location.pathname=/',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(true)
  })


  it('should validate false', () => {
    expect(less({
      property: 'clicks<10',
      value: true,
      mixinKey: '<',
      Component
    })).to.equal(false)
    expect(equal({
      property: 'border=2px',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(false)
    expect(unEqual({
      property: 'clicks!=20',
      value: true,
      mixinKey: '!=',
      Component
    })).to.equal(false)
    expect(lessThan({
      property: 'clicks<=10',
      value: true,
      mixinKey: '<=',
      Component
    })).to.equal(false)
    expect(equal({
      property: 'highlight=undefined',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(false)
    expect(equal({
      property: 'error=undefined',
      value: true,
      mixinKey: '=',
      Component
    })).to.equal(false)
  })
})
