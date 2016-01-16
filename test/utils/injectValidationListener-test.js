import injectValidationListener from '../../modules/utils/injectValidationListener'
import { expect } from 'chai'

describe('Injecting validation listeners', () => {
  it('should return false if element is not an input', () => {
    expect(injectValidationListener({ }, { type: 'div' }, { })).to.eql(false)
  })

  it('should return false if no ref was set', () => {
    expect(injectValidationListener({ }, {
      type: 'input',
      ref: null
    }, { })).to.eql(false)
  })

  it('should add a change listener', () => {
    const newProps = { }
    injectValidationListener({
      state: {
        _look: new Map()
      }
    }, { type: 'input', ref: 'in', props: { } }, newProps)
    expect(typeof newProps.onChange).to.eql('function')
  })

  it('should return the validation state', () => {
    expect(injectValidationListener({
      state: {
        _look: new Map()
      }
    }, { type: 'input', ref: 'in', props: { } }, { })).to.eql(undefined)
  })
})
