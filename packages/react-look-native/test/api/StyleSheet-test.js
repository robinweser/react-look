import StyleSheet from '../../modules/api/StyleSheet'
import StyleContainer from '../../modules/api/StyleContainer'

describe('Creating a StyleSheet', () => {
  it('should just return styles', () => {
    const styles = { color: 'red' }
    expect(StyleSheet.create(styles)).to.eql(styles)
  })

  it('should generate dynamic selectors', () => {
    const styles = {
      color: 'red',
      'isDynamic=true': {
        color: 'blue'
      }
    }
    const staticStyles = { color: 'red', _selector: [ 's0' ] }
    const dynamicStyles = { 'isDynamic=true': { color: 'blue' } }
    expect(StyleSheet.create(styles)).to.eql(staticStyles)
    expect(StyleContainer._getDynamic('s0')).to.eql(dynamicStyles)
  })

  it('should generate dynamic selectors for multiple selectors', () => {
    const styles = {
      foo: {
        color: 'red',
        'isDynamic=true': {
          color: 'blue'
        }
      },
      bar: {
        color: 'blue'
      }
    }
    const staticStyles = {
      foo: {
        color: 'red',
        _selector: [ 's0' ]
      },
      bar: {
        color: 'blue'
      }
    }
    const dynamicStyles = { 'isDynamic=true': { color: 'blue' } }
    expect(StyleSheet.create(styles)).to.eql(staticStyles)
    expect(StyleContainer._getDynamic('s0')).to.eql(dynamicStyles)
  })
})

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

  it('should just merge dynamic selectors', () => {
    const styles = StyleSheet.create({
      color: 'red',
      backgroundColor: 'blue',
      'isDynamic=true': {
        color: 'red'
      }
    })
    const newStyles = StyleSheet.create({
      color: 'blue',
      'isDynamic=true': {
        color: 'red'
      }
    })

    expect(StyleSheet.combineStyles(styles, newStyles)).to.eql({
      color: 'blue',
      backgroundColor: 'blue',
      _selector: [ 's0', 's1' ]
    })
  })
})
