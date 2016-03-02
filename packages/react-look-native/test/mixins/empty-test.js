import isEmpty from '../../modules/mixins/empty'

describe('Evaluating empty elements', () => {
  it('should validate true', () => {
    const emptyChildren = { children: [] }
    const noChildren = { newProps: { } }

    expect(isEmpty(TestUtils.mockMixinInterface(':empty', true, ':empty', emptyChildren))).to.equal(true)
    expect(isEmpty(TestUtils.mockMixinInterface(':empty', true, ':empty', noChildren))).to.equal(true)
  })

  it('should validate false', () => {
    const newProps = { children: [ 'test' ] }

    expect(isEmpty(TestUtils.mockMixinInterface(':empty', true, ':empty', newProps))).to.equal(false)
  })
})
