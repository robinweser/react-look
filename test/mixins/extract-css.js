import ExtractCSS from '../../lib/mixins/extract-css'
import {expect} from 'chai'

let extractCSS = ExtractCSS[0].fn

describe('Extracting classNames', () => {

	it('should extract css to classNames', () => {
		let args = {
			newProps: {}
		}

		extractCSS('css', 'foo', args)
		expect(args.newProps).to.eql({
			className: 'foo'
		})
	})

	it('should concat css if a className already exists', () => {
		let args = {
			newProps: {
				className: 'bar'
			}
		}

		extractCSS('css', 'foo', args)
		expect(args.newProps).to.eql({
			className: 'bar foo'
		})
	})
})