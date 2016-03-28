import renderStaticStyles, { extractDynamicStyles } from '../../modules/core/renderer'
import StyleContainer from '../../modules/api/StyleContainer'

describe('Extracting dynamic styles', () => {
  it('should return a scoped stateful selector if a function is passed', () => {
    const input = props => ({ backgroundColor: 'red', width: 12 })
    const output = { _statefulSelector: input }
    expect(extractDynamicStyles(input)).to.eql(output)
  })

  it('should be empty if no dynamic styles are used', () => {
    const input = { backgroundColor: 'red', width: 12 }
    expect(extractDynamicStyles(input)).to.eql({ })
  })

  it('should extract flat dynamic style properties', () => {
    const colorFn = props => props.color

    const input = {
      backgroundColor: 'red',
      width: 12,
      color: colorFn
    }
    const output = { color: colorFn }
    expect(extractDynamicStyles(input)).to.eql(output)
  })

  it('should remove a selector if containing only dynamic styles', () => {
    const styles = {
      'isDynamic=true': {
        color: props => props.color
      }
    }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })

  it('should remove a selector if it is an object', () => {
    const styles = { box: { color: 'red' } }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })

  it('should also treat boolean values as dynamic', () => {
    const styles = { box: { color: true } }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })
})
describe('Rendering static styles', () => {
  it('should return a selector', () => {
    const styles = {
      'isDynamic=true': {
        color: 'red'
      },
      backgroundColor: 'blue'
    }
    const selector = renderStaticStyles(styles)
    expect(selector).to.eql('s0')
  })

  it('should seperate dynamic styles', () => {
    const dynamicStyle = props => props.color
    const styles = { color: dynamicStyle }
    const selector = renderStaticStyles(styles)
    expect(selector).to.eql('s0')
    expect(StyleContainer.dynamics.get('s0').color).to.eql(dynamicStyle)
  })
})
