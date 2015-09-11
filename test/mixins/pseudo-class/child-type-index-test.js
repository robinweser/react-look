import ChildTypeIndex from '../../../lib/mixins/pseudo-class/child-type-index'
import {expect} from 'chai'

//Separating mixin functions for better testing
let firstOfType, lastOfType, onlyOfType, nthOfType, nthlastOfType
ChildTypeIndex.forEach(mixin => {
	switch (mixin.key) {
		case ':first-of-type':
			firstOfType = mixin.fn
			break
		case ':last-of-type':
			lastOfType = mixin.fn
			break
		case ':only-of-type':
			onlyOfType = mixin.fn
			break
		case ':nth-of-type':
			nthOfType = mixin.fn
			break
		case ':nth-last-of-type':
			nthlastOfType = mixin.fn
			break
	}
})


function generate(typeIndex, typeLength, length) {
	return {
		childIndexMap: {
			typeIndex: typeIndex,
			typeLength: typeLength,
			length: length
		}
	}
}


describe('Evaluating first-of-type pseudo class', () => {
	it('should validate true', () => {
		expect(firstOfType(':first-of-type', true, generate(1))).to.equal(true)
	})


	it('should validate false', () => {
		expect(firstOfType(':first-of-type', true, generate(2))).to.equal(false)
		expect(firstOfType(':first-of-type', true, generate(3))).to.equal(false)
	})
})

describe('Evaluating last-of-type pseudo class', () => {
	it('should validate true', () => {
		expect(lastOfType(':last-of-type', true, generate(2, 2))).to.equal(true)
		expect(lastOfType(':last-of-type', true, generate(14, 14))).to.equal(true)
	})


	it('should validate false', () => {
		expect(lastOfType(':last-of-type', true, generate(2, 4))).to.equal(false)
		expect(lastOfType(':last-of-type', true, generate(3, 4))).to.equal(false)
	})
})


describe('Evaluating only-of-type pseudo class', () => {
	it('should validate true', () => {
		expect(onlyOfType(':only-of-type', true, generate(1, 1))).to.equal(true)
		expect(onlyOfType(':only-of-type', true, generate(1, 1, 2))).to.equal(true)
	})


	it('should validate false', () => {
		expect(onlyOfType(':only-of-type', true, generate(1, 2))).to.equal(false)
		expect(onlyOfType(':only-of-type', true, generate(2, 2))).to.equal(false)
	})
})


describe('Evaluating nth-of-type pseudo class', () => {
	it('should validate true', () => {
		expect(nthOfType(':nth-of-type(even)', true, generate(2))).to.equal(true)
		expect(nthOfType(':nth-of-type(even)', true, generate(4))).to.equal(true)

		expect(nthOfType(':nth-of-type(odd)', true, generate(1))).to.equal(true)
		expect(nthOfType(':nth-of-type(odd)', true, generate(3))).to.equal(true)

		expect(nthOfType(':nth-of-type(3n+2)', true, generate(2))).to.equal(true)
		expect(nthOfType(':nth-of-type(3n+2)', true, generate(5))).to.equal(true)
		expect(nthOfType(':nth-of-type(3n+2)', true, generate(8))).to.equal(true)

		expect(nthOfType(':nth-of-type(-2n+3)', true, generate(1))).to.equal(true)
		expect(nthOfType(':nth-of-type(-2n+3)', true, generate(3))).to.equal(true)

		expect(nthOfType(':nth-of-type(-3n+5)', true, generate(2))).to.equal(true)
		expect(nthOfType(':nth-of-type(-3n+5)', true, generate(5))).to.equal(true)

		expect(nthOfType(':nth-of-type(n+3)', true, generate(3))).to.equal(true)
		expect(nthOfType(':nth-of-type(n+3)', true, generate(4))).to.equal(true)
		expect(nthOfType(':nth-of-type(n+3)', true, generate(5))).to.equal(true)

		expect(nthOfType(':nth-of-type(3)', true, generate(3))).to.equal(true)
	})


	it('should validate false', () => {
		expect(nthOfType(':nth-of-type(even)', true, generate(1))).to.equal(false)
		expect(nthOfType(':nth-of-type(even)', true, generate(3))).to.equal(false)

		expect(nthOfType(':nth-of-type(odd)', true, generate(2))).to.equal(false)
		expect(nthOfType(':nth-of-type(odd)', true, generate(4))).to.equal(false)

		expect(nthOfType(':nth-of-type(3n+2)', true, generate(1))).to.equal(false)
		expect(nthOfType(':nth-of-type(3n+2)', true, generate(4))).to.equal(false)
		expect(nthOfType(':nth-of-type(3n+2)', true, generate(6))).to.equal(false)
		expect(nthOfType(':nth-of-type(3n+2)', true, generate(7))).to.equal(false)

		expect(nthOfType(':nth-of-type(-2n+3)', true, generate(2))).to.equal(false)
		expect(nthOfType(':nth-of-type(-2n+3)', true, generate(4))).to.equal(false)
		expect(nthOfType(':nth-of-type(-2n+3)', true, generate(5))).to.equal(false)

		expect(nthOfType(':nth-of-type(n+3)', true, generate(1))).to.equal(false)
		expect(nthOfType(':nth-of-type(n+3)', true, generate(2))).to.equal(false)

		expect(nthOfType(':nth-of-type(3)', true, generate(1))).to.equal(false)
		expect(nthOfType(':nth-of-type(3)', true, generate(2))).to.equal(false)
		expect(nthOfType(':nth-of-type(3)', true, generate(4))).to.equal(false)
	})

})


describe('Evaluating nth-last-of-type pseudo class', () => {
	it('should validate true', () => {
		expect(nthlastOfType(':nth-last-of-type(even)', true, generate(2, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(even)', true, generate(4, 5))).to.equal(true)

		expect(nthlastOfType(':nth-last-of-type(odd)', true, generate(1, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(odd)', true, generate(3, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(odd)', true, generate(5, 5))).to.equal(true)


		expect(nthlastOfType(':nth-last-of-type(3n+2)', true, generate(1, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(3n+2)', true, generate(4, 5))).to.equal(true)

		expect(nthlastOfType(':nth-last-of-type(-2n+3)', true, generate(3, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(-2n+3)', true, generate(5, 5))).to.equal(true)

		expect(nthlastOfType(':nth-last-of-type(n+3)', true, generate(1, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(n+3)', true, generate(2, 5))).to.equal(true)
		expect(nthlastOfType(':nth-last-of-type(n+3)', true, generate(3, 5))).to.equal(true)

		expect(nthlastOfType(':nth-last-of-type(3)', true, generate(3, 5))).to.equal(true)
	})


	it('should validate false', () => {
		expect(nthlastOfType(':nth-last-of-type(even)', true, generate(1, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(even)', true, generate(3, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(even)', true, generate(5, 5))).to.equal(false)

		expect(nthlastOfType(':nth-last-of-type(odd)', true, generate(2, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(odd)', true, generate(4, 5))).to.equal(false)

		expect(nthlastOfType(':nth-last-of-type(3n+2)', true, generate(2, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(3n+2)', true, generate(3, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(3n+2)', true, generate(5, 5))).to.equal(false)

		expect(nthlastOfType(':nth-last-of-type(-2n+3)', true, generate(1, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(-2n+3)', true, generate(2, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(-2n+3)', true, generate(4, 5))).to.equal(false)

		expect(nthlastOfType(':nth-last-of-type(n+3)', true, generate(4, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(n+3)', true, generate(5, 5))).to.equal(false)

		expect(nthlastOfType(':nth-last-of-type(3)', true, generate(1, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(3)', true, generate(2, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(3)', true, generate(4, 5))).to.equal(false)
		expect(nthlastOfType(':nth-last-of-type(3)', true, generate(5, 5))).to.equal(false)
	})
})