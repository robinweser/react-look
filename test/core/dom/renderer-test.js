import renderStaticStyles, { extractDynamicStyles, renderSpecialStyles } from '../../../modules/core/dom/renderer'
import StyleContainer from '../../../modules/api/dom/StyleContainer'
import { expect } from 'chai'

describe('Extracting dynamic styles', () => {
  it('should be empty if no dynamic styles are used', () => {
    const styles = {
      backgroundColor: 'red',
      width: 12,
      display: [ '-webkit-flex', 'flex' ]
    }
    expect(extractDynamicStyles(styles)).to.eql({ })
  })

  it('should extract flat dynamic style properties', () => {
    const colorFn = props => props.color

    const styles = {
      backgroundColor: 'red',
      width: 12,
      display: [ '-webkit-flex', 'flex' ],
      color: colorFn
    }
    expect(extractDynamicStyles(styles)).to.eql({
      color: colorFn
    })
  })

  it('should remove a selector if containing only dynamic styles', () => {
    const styles = { ':hover': { color: props => props.color } }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })

  it('should remove a selector if it is an object but not a pseudo class or media query', () => {
    const styles = { box: { color: 'red' } }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })

  it('should also treat boolean values as dynamic', () => {
    const styles = { box: { color: true } }
    extractDynamicStyles(styles)
    expect(styles).to.eql({ })
  })

  it('should extract nested dynamic style properties', () => {
    const colorFn = props => props.color
    const styles = {
      backgroundColor: 'red',
      width: 12,
      display: [ '-webkit-flex', 'flex' ],
      ':hover': {
        backgroundColor: 'blue',
        color: colorFn
      }
    }
    expect(extractDynamicStyles(styles)).to.eql({
      ':hover': {
        color: colorFn
      }
    })
  })

  it('should extract both nested and flat dynamic style properties', () => {
    const colorFn = props => props.color
    const colorFnState = (props, state) => state.color

    const styles = {
      backgroundColor: 'red',
      width: 12,
      display: [ '-webkit-flex', 'flex' ],
      color: colorFnState,
      ':hover': {
        backgroundColor: 'blue',
        color: colorFn
      }
    }

    expect(extractDynamicStyles(styles)).to.eql({
      color: colorFnState,
      ':hover': {
        color: colorFn
      }
    })
  })

  it('should extract complex style objects', () => {
    const colorFn = props => props.color
    const colorFnState = (props, state) => state.color
    const fontSizeFn = props => props.size

    const styles = {
      backgroundColor: 'red',
      width: 12,
      display: [ 'webkit-flex', 'flex' ],
      color: colorFn,
      ':focus': {
        color: 'blue',
        width: 12,
        ':hover': {
          lineHeight: 12,
          fontSize: fontSizeFn
        },
        ':active': {
          color: 'black'
        }
      },
      // This should be ignored completely
      ':active': {
        width: 300,
        ':hover': {
          fontSize: 13
        }
      },
      '@media (min-width: 200px)': {
        backgroundColor: 'red',
        width: 12,
        display: [ 'webkit-flex', 'flex' ],
        '@media (min-height: 300px)': {
          backgroundColor: 'red',
          color: colorFn,
          width: 12,
          display: [ 'webkit-flex', 'flex' ],

          ':hover': {
            lineHeight: 12,
            fontSize: fontSizeFn
          }
        }
      }
    }

    expect(extractDynamicStyles(styles)).to.eql({
      color: colorFn,
      ':focus': {
        ':hover': {
          fontSize: fontSizeFn
        }
      },
      '@media (min-width: 200px)': {
        '@media (min-height: 300px)': {
          color: colorFn,
          ':hover': {
            fontSize: fontSizeFn
          }
        }
      }
    })
    expect(styles).to.eql({
      backgroundColor: 'red',
      width: 12,
      display: [ 'webkit-flex', 'flex' ],
      ':focus': {
        color: 'blue',
        width: 12,
        ':active': {
          color: 'black'
        },
        ':hover': {
          lineHeight: 12
        }
      },
      ':active': {
        width: 300,
        ':hover': {
          fontSize: 13
        }
      },
      '@media (min-width: 200px)': {
        backgroundColor: 'red',
        width: 12,
        display: [ 'webkit-flex', 'flex' ],
        '@media (min-height: 300px)': {
          ':hover': {
            lineHeight: 12
          },
          backgroundColor: 'red',
          width: 12,
          display: [ 'webkit-flex', 'flex' ]
        }
      }
    })
  })
})

describe('Rendering special styles', () => {
  it('should add special styles to the style StyleContainer', () => {
    const styles = {
      ':hover': {
        color: 'red'
      },
      '@media (min-height: 300px)': {
        color: 'blue'
      },
      backgroundColor: 'blue'
    }
    renderSpecialStyles('class', styles)
    expect(StyleContainer.selectors.has('.class:hover')).to.eql(true)
    expect(StyleContainer.mediaQueries.has('(min-height: 300px)')).to.eql(true)
  })

  it('should concatenate media queries within the StyleContainer', () => {
    const styles = {
      '@media (min-height: 300px)': {
        '@media (max-height: 500px)': {
          color: 'blue'
        }
      }
    }
    renderSpecialStyles('class', styles)
    expect(StyleContainer.mediaQueries.has('(min-height: 300px)and(max-height: 500px)')).to.eql(true)
  })
})

describe('Rendering static styles', () => {
  it('should return a className', () => {
    const styles = {
      ':hover': {
        color: 'red'
      },
      '@media (min-height: 300px)': {
        color: 'blue'
      },
      backgroundColor: 'blue'
    }
    const className = renderStaticStyles(styles)
    expect(className).to.eql('c0')
  })

  it('should seperate dynamic styles', () => {
    const dynamicStyle = props => props.color
    const styles = { color: dynamicStyle }
    const className = renderStaticStyles(styles)
    expect(className).to.eql('c0')
    expect(StyleContainer.dynamics.get('c0').color).to.eql(dynamicStyle)
  })
})
