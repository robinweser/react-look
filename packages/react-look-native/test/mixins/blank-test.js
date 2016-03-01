import isBlank from '../../modules/mixins/blank'

describe('Evaluating blank elements', () => {
  it('should validate true', () => {
    const blankChildren = { children: ' ' }
    const notTrimmed = { children: '   ' }

    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', blankChildren))).to.equal(true)
    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', notTrimmed))).to.equal(true)
  })

  it('should validate false', () => {
    const newProps1 = { children: [ '1' ] }
    const newProps2 = { children: '1' }

    const newProps3 = { children: 12 }
    const newProps4 = { children: { type: 'div' } }
    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', newProps1))).to.equal(false)
    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', newProps2))).to.equal(false)
    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', newProps3))).to.equal(false)
    expect(isBlank(TestUtils.mockMixinInterface(':blank', true, ':blank', newProps4))).to.equal(false)
  })
})
