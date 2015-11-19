import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from '../../../lib/mixins/pseudoClasses/input'

import { expect } from 'chai'


describe('Evaluating input pseudo classes', () => {

  it('should validate true', () => {
    let args = {
      newProps: {
        checked: true,
        disabled: true,
        required: true,
        readOnly: true,
        indeterminate: true
      }
    }
    expect(checked(':checked', true, ':checked', args)).to.equal(true)
    expect(disabled(':disabled', true, ':disabled', args)).to.equal(true)
    expect(required(':required', true, ':required', args)).to.equal(true)
    expect(readOnly(':read-only', true, ':read-only', args)).to.equal(true)
    expect(indeterminate(':indeterminate', true, ':indeterminate', args)).to.equal(true)

    expect(enabled(':enabled', true, ':enabled', args)).to.equal(false)
    expect(optional(':optional', true, ':optional', args)).to.equal(false)
    expect(readWrite(':read-write', true, ':read-write', args)).to.equal(false)
  })

  it('should validate false', () => {
    let args = {newProps: {}}
    expect(checked(':checked', true, ':checked', args)).to.equal(false)
    expect(disabled(':disabled', true, ':disabled', args)).to.equal(false)
    expect(required(':required', true, ':required', args)).to.equal(false)
    expect(readOnly(':read-only', true, ':read-only', args)).to.equal(false)
    expect(indeterminate(':indeterminate', true, ':indeterminate', args)).to.equal(false)

    expect(enabled(':enabled', true, ':enabled', args)).to.equal(true)
    expect(optional(':optional', true, ':optional', args)).to.equal(true)
    expect(readWrite(':read-write', true, ':read-write', args)).to.equal(true)
  })
})
