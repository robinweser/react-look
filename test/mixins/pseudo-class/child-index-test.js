import ChildIndex from '../../../lib/mixins/pseudo-class/child-index'
import {expect} from 'chai'

//Separating mixin functions for better testing
let firstChild, lastChild, onlyChild, nthChild, nthLastChild
ChildIndex.forEach(mixin => {
	switch (mixin.key) {
		case ':first-child':
			firstChild = mixin.fn
			break
		case ':last-child':
			lastChild = mixin.fn
			break
		case ':only-child':
			onlyChild = mixin.fn
			break
		case ':nth-child':
			nthChild = mixin.fn
			break
		case ':nth-last-child':
			nthLastChild = mixin.fn
			break
	}
})


function generate(index, length) {
	return {
		childIndexMap: {
			index: index,
			length: length
		}
	}
}


describe('Evaluating first-child pseudo class', () => {
	it('should validate true', () => {
		expect(firstChild(':first-child', true, generate(1))).to.equal(true)
	})


	it('should validate false', () => {
		expect(firstChild(':first-child', true, generate(2))).to.equal(false)
		expect(firstChild(':first-child', true, generate(3))).to.equal(false)
	})
})

describe('Evaluating last-child pseudo class', () => {
	it('should validate true', () => {
		expect(lastChild(':last-child', true, generate(2, 2))).to.equal(true)
		expect(lastChild(':last-child', true, generate(14, 14))).to.equal(true)
	})


	it('should validate false', () => {
		expect(lastChild(':last-child', true, generate(2, 4))).to.equal(false)
		expect(lastChild(':last-child', true, generate(3, 4))).to.equal(false)
	})
})


describe('Evaluating only-child pseudo class', () => {
	it('should validate true', () => {
		expect(onlyChild(':only-child', true, generate(1, 1))).to.equal(true)
	})


	it('should validate false', () => {
		expect(onlyChild(':only-child', true, generate(1, 2))).to.equal(false)
		expect(onlyChild(':only-child', true, generate(2, 2))).to.equal(false)
	})
})


describe('Evaluating nth-child pseudo class', () => {
	it('should validate true', () => {
		expect(nthChild(':nth-child(even)', true, generate(2))).to.equal(true)
		expect(nthChild(':nth-child(even)', true, generate(4))).to.equal(true)

		expect(nthChild(':nth-child(odd)', true, generate(1))).to.equal(true)
		expect(nthChild(':nth-child(odd)', true, generate(3))).to.equal(true)

		expect(nthChild(':nth-child(3n+2)', true, generate(2))).to.equal(true)
		expect(nthChild(':nth-child(3n+2)', true, generate(5))).to.equal(true)
		expect(nthChild(':nth-child(3n+2)', true, generate(8))).to.equal(true)

		expect(nthChild(':nth-child(-2n+3)', true, generate(1))).to.equal(true)
		expect(nthChild(':nth-child(-2n+3)', true, generate(3))).to.equal(true)

		expect(nthChild(':nth-child(-3n+5)', true, generate(2))).to.equal(true)
		expect(nthChild(':nth-child(-3n+5)', true, generate(5))).to.equal(true)

		expect(nthChild(':nth-child(n+3)', true, generate(3))).to.equal(true)
		expect(nthChild(':nth-child(n+3)', true, generate(4))).to.equal(true)
		expect(nthChild(':nth-child(n+3)', true, generate(5))).to.equal(true)

		expect(nthChild(':nth-child(3)', true, generate(3))).to.equal(true)
	})


	it('should validate false', () => {
		expect(nthChild(':nth-child(even)', true, generate(1))).to.equal(false)
		expect(nthChild(':nth-child(even)', true, generate(3))).to.equal(false)

		expect(nthChild(':nth-child(odd)', true, generate(2))).to.equal(false)
		expect(nthChild(':nth-child(odd)', true, generate(4))).to.equal(false)

		expect(nthChild(':nth-child(3n+2)', true, generate(1))).to.equal(false)
		expect(nthChild(':nth-child(3n+2)', true, generate(4))).to.equal(false)
		expect(nthChild(':nth-child(3n+2)', true, generate(6))).to.equal(false)
		expect(nthChild(':nth-child(3n+2)', true, generate(7))).to.equal(false)

		expect(nthChild(':nth-child(-2n+3)', true, generate(2))).to.equal(false)
		expect(nthChild(':nth-child(-2n+3)', true, generate(4))).to.equal(false)
		expect(nthChild(':nth-child(-2n+3)', true, generate(5))).to.equal(false)

		expect(nthChild(':nth-child(n+3)', true, generate(1))).to.equal(false)
		expect(nthChild(':nth-child(n+3)', true, generate(2))).to.equal(false)

		expect(nthChild(':nth-child(3)', true, generate(1))).to.equal(false)
		expect(nthChild(':nth-child(3)', true, generate(2))).to.equal(false)
		expect(nthChild(':nth-child(3)', true, generate(4))).to.equal(false)
	})

})


describe('Evaluating nth-last-child pseudo class', () => {
	it('should validate true', () => {
		expect(nthLastChild(':nth-last-child(even)', true, generate(2, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(even)', true, generate(4, 5))).to.equal(true)

		expect(nthLastChild(':nth-last-child(odd)', true, generate(1, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(odd)', true, generate(3, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(odd)', true, generate(5, 5))).to.equal(true)


		expect(nthLastChild(':nth-last-child(3n+2)', true, generate(1, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(3n+2)', true, generate(4, 5))).to.equal(true)

		expect(nthLastChild(':nth-last-child(-2n+3)', true, generate(3, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(-2n+3)', true, generate(5, 5))).to.equal(true)

		expect(nthLastChild(':nth-last-child(n+3)', true, generate(1, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(n+3)', true, generate(2, 5))).to.equal(true)
		expect(nthLastChild(':nth-last-child(n+3)', true, generate(3, 5))).to.equal(true)

		expect(nthLastChild(':nth-last-child(3)', true, generate(3, 5))).to.equal(true)
	})


	it('should validate false', () => {
		expect(nthLastChild(':nth-last-child(even)', true, generate(1, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(even)', true, generate(3, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(even)', true, generate(5, 5))).to.equal(false)

		expect(nthLastChild(':nth-last-child(odd)', true, generate(2, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(odd)', true, generate(4, 5))).to.equal(false)

		expect(nthLastChild(':nth-last-child(3n+2)', true, generate(2, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(3n+2)', true, generate(3, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(3n+2)', true, generate(5, 5))).to.equal(false)

		expect(nthLastChild(':nth-last-child(-2n+3)', true, generate(1, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(-2n+3)', true, generate(2, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(-2n+3)', true, generate(4, 5))).to.equal(false)

		expect(nthLastChild(':nth-last-child(n+3)', true, generate(4, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(n+3)', true, generate(5, 5))).to.equal(false)

		expect(nthLastChild(':nth-last-child(3)', true, generate(1, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(3)', true, generate(2, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(3)', true, generate(4, 5))).to.equal(false)
		expect(nthLastChild(':nth-last-child(3)', true, generate(5, 5))).to.equal(false)
	})
})