import mediaQuery from '../../lib/properties/mediaQuery'
import { expect } from 'chai'

describe('Resolving media queries', () => {

  it('should return if no matchMedia-method is found', () => {
    expect(mediaQuery('@media (min-width: 300px)', {color: 'blue'}, '@media', {
      Component: undefined
    })).to.eql(undefined)
  })
})
