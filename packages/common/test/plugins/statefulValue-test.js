import statefulValue from '../../plugins/statefulValue'

describe('Resolving stateful values', () => {

  it('should resolve stateful values', () => {
    const Component = { props: { color: 'red' } }
    expect(statefulValue({
      styles: {
        color: (props) => props.color
      },
      Component
    })).to.eql({ color: 'red' })
  })

  it('should do nothing if no function was passed', () => {
    const Component = { props: { color: 'red' } }
    expect(statefulValue({ styles: { color: 'red' }, Component })).to.eql({
      color: 'red'
    })
  })
})
