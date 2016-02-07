import contains from '../../modules/mixins/contains'
import { expect } from 'chai'

describe('Evaluating :contains pseudo', () => {

  it('should validate true', () => {
    const equal = { children: 'foo' }
    const contain = { children: 'foobar' }
    expect(contains({
      property: ':contains(foo)',
      value: true,
      mixinKey: ':contains',
      newProps: equal
    })).to.equal(true)
    expect(contains({
      property: ':contains(ooba)',
      value: true,
      mixinKey: ':contains',
      newProps: contain
    })).to.equal(true)
  })

  it('should validate false', () => {
    const newProps = { children: 'foobar' }
    expect(contains({
      property: ':contains(fooobar)',
      value: true,
      mixinKey: ':contains',
      newProps
    })).to.equal(false)
  })
})
