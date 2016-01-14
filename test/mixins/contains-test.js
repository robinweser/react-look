import contains from '../../modules/mixins/contains'
import { expect } from 'chai'

describe('Evaluating :contains pseudo', () => {

  it('should validate true', () => {
    const equal = { newProps: { children: 'foo' } }
    const contain = { newProps: { children: 'foobar' } }
    expect(contains(':contains(foo)', true, ':contains', equal)).to.equal(true)
    expect(contains(':contains(ooba)', true, ':contains', contain)).to.equal(true)
  })

  it('should validate false', () => {
    const args = { newProps: { children: 'foobar' } }
    expect(contains(':contains(fooobar)', true, ':contains', args)).to.equal(false)
  })
})
