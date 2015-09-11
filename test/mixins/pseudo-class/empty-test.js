import Empty from '../../../lib/mixins/pseudo-class/empty'
import {expect} from 'chai'

let isEmpty = Empty[0].fn

describe('Evaluating empty elements', () => {

	it('should validate true', () => {
		let emptyChildren = {
			newProps: {
				children: []
			}
		}
		let noChildren = {
			newProps: {}
		}
		expect(isEmpty(':empty', true, emptyChildren)).to.equal(true)
		expect(isEmpty(':empty', true, noChildren)).to.equal(true)
	})

	it('should validate false', () => {
		let args = {
			newProps: {
				children: ['test']
			}
		}

		expect(isEmpty(':lang(de)', true, args)).to.equal(false)
	})
})