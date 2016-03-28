import { before, after } from '../../modules/mixins/beforeAfter'

describe('Adding elements before', () => {
  it('should add a primitive before all children', () => {
    const newProps = { children: 'test' }
    const content = { content: 'inserted' }

    before(TestUtils.mockMixinInterface(':before', content, ':before', newProps))
    expect(newProps.children[0]).to.eql('inserted')
    expect(newProps.children[1]).to.eql('test')
  })

  it('should add a new React element with styles before all children', () => {
    const newProps = { children: 'test' }
    const content = { content: 'inserted', color: 'red' }

    before(TestUtils.mockMixinInterface(':before', content, ':before', newProps))
    expect(newProps.children[0].props.children).to.eql('inserted')
    expect(newProps.children[0].props.style).to.eql({
      color: 'red'
    })
    expect(newProps.children[1]).to.eql('test')
  })
})

describe('Adding elements after', () => {
  it('should add a primitive after all children', () => {
    const newProps = { children: 'test' }
    const content = { content: 'inserted' }

    after(TestUtils.mockMixinInterface(':after', content, ':after', newProps))
    expect(newProps.children[1]).to.eql('inserted')
    expect(newProps.children[0]).to.eql('test')
  })

  it('should add a new React element with styles after all children', () => {
    const newProps = { children: 'test' }
    const content = { content: 'inserted', color: 'red' }

    after(TestUtils.mockMixinInterface(':after', content, ':after', newProps))
    expect(newProps.children[1].props.children).to.eql('inserted')
    expect(newProps.children[1].props.style).to.eql({
      color: 'red'
    })
    expect(newProps.children[0]).to.eql('test')
  })
})
