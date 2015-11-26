import isUnitlessProperty from '../../lib/utils/isUnitlessProperty'
import { expect } from 'chai'

describe('Checking for unitless properties', () => {

  it('should return false if a unit-sensitive property is passed', () => {
    expect(isUnitlessProperty('width')).to.eql(false)
  })

  it('should return true if a unitless property is passed', () => {
    expect(isUnitlessProperty('flex')).to.eql(true)
  })

  it('should also recognized prefixed unitless properties', () => {
    expect(isUnitlessProperty('WebkitFlex')).to.eql(true)
  })
})
