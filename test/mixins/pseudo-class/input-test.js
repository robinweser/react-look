import Input from '../../../lib/mixins/pseudo-class/input'
import {expect} from 'chai'

//Separating mixin functions for better testing
let checked, disabled, required, readOnly, indeterminate, enabled, optional, readWrite
Input.forEach(mixin => {
	switch (mixin.key) {
		case ':checked':
			checked = mixin.fn
			break
		case ':disabled':
			disabled = mixin.fn
			break
		case ':required':
			required = mixin.fn
			break
		case ':read-only':
			readOnly = mixin.fn
			break
		case ':indeterminate':
			indeterminate = mixin.fn
			break
		case ':enabled':
			enabled = mixin.fn
			break
		case ':optional':
			optional = mixin.fn
			break
		case ':read-write':
			readWrite = mixin.fn
			break
	}
})

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
		expect(checked(':checked', true, args)).to.equal(true)
		expect(disabled(':disabled', true, args)).to.equal(true)
		expect(required(':required', true, args)).to.equal(true)
		expect(readOnly(':read-only', true, args)).to.equal(true)
		expect(indeterminate(':indeterminate', true, args)).to.equal(true)

		expect(enabled(':enabled', true, args)).to.equal(false)
		expect(optional(':optional', true, args)).to.equal(false)
		expect(readWrite(':read-write', true, args)).to.equal(false)
	})

	it('should validate false', () => {
		let args = {
			newProps: {}
		}
		expect(checked(':checked', true, args)).to.equal(false)
		expect(disabled(':disabled', true, args)).to.equal(false)
		expect(required(':required', true, args)).to.equal(false)
		expect(readOnly(':read-only', true, args)).to.equal(false)
		expect(indeterminate(':indeterminate', true, args)).to.equal(false)

		expect(enabled(':enabled', true, args)).to.equal(true)
		expect(optional(':optional', true, args)).to.equal(true)
		expect(readWrite(':read-write', true, args)).to.equal(true)
	})
})