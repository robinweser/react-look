import StyleSheet from '../../modules/api/StyleSheet'

describe('Creating a StyleSheet', () => {
  it('should just return styles', () => {
    const styles = { color: 'red' }
    expect(StyleSheet.create(styles)).to.eql(styles)
  })
})

describe('Combining styles', () => {
  it('should just merge styles in preceding order', () => {
    const styles = { color: 'red', backgroundColor: 'blue' }
    const newStyles = { color: 'blue' }

    expect(StyleSheet.combineStyles(styles, newStyles)).to.eql({
      color: 'blue',
      backgroundColor: 'blue'
    })
  })
})
