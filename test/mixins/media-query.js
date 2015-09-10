import {mediaQuery} from '../../lib/mixins/media-query'
import jsdom from 'mocha-jsdom'
import {expect} from 'chai'


describe('Resolving media queries', () => {

	it('should return is no matchMedia-method is found', () => {
		expect(mediaQuery('@media (min-width: 300px)'), {
			color: 'blue'
		}, {}).to.eql(false)
	})
})
