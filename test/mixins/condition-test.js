import {expect} from 'chai'
import Conditions from '../../lib/mixins/condition'

describe('Evaluating conditions', () => {
	let args = {
		Component: {
			props: {
				highlight: true,
				clicks: 20,
				noprop: undefined,
				error: null
			},
			state: {}
		}
	}

	//Separating mixin functions for better testing
	let equal, greater, unEqual, greaterThan, less, lessThan
	Conditions.forEach(mixin => {
		switch (mixin.key) {
			case '>=':
				greaterThan = mixin.fn
				break
			case '<=':
				lessThan = mixin.fn
				break
			case '>':
				greater = mixin.fn
				break
			case '<':
				less = mixin.fn
				break
			case '=':
				equal = mixin.fn
				break
			case '!=':
				unEqual = mixin.fn
				break
		}
	})

	it('should validate true', () => {
		expect(equal('highlight=true', true, args)).to.equal(true)
		expect(greater('clicks>10', true, args)).to.equal(true)
		expect(unEqual('clicks!=15', true, args)).to.equal(true)
		expect(greaterThan('clicks>=20', true, args)).to.equal(true)
		expect(greaterThan('clicks>=19', true, args)).to.equal(true)
		expect(equal('noprop=undefined', true, args)).to.equal(true)
		expect(unEqual('clicks!=undefined', true, args)).to.equal(true)
		expect(equal('error=null', true, args)).to.equal(true)
	})


	it('should validate false', () => {
		expect(less('clicks<10', true, args)).to.equal(false)
		expect(equal('border=2px', true, args)).to.equal(false)
		expect(unEqual('clicks!=20', true, args)).to.equal(false)
		expect(lessThan('clicks<=10', true, args)).to.equal(false)
		expect(equal('highlight=undefined', true, args)).to.equal(false)
		expect(equal('error=undefined', true, args)).to.equal(false)
	})
})
