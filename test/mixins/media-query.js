import MediaQueries from '../../lib/mixins/media-query'
import {expect} from 'chai'

let mediaQuery = MediaQueries[0].fn

describe('Resolving media queries', () => {

	it('should return is no matchMedia-method is found', () => {
		expect(mediaQuery('@media (min-width: 300px)'), {
			color: 'blue'
		}, {}).to.eql(false)
	})
})
