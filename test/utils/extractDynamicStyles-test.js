import extractDynamicStyles from '../../modules/utils/extractDynamicStyles'
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
