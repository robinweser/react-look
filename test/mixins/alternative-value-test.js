import AlternativeValue from '../../lib/mixins/alternative-value'
import {expect} from 'chai'

let resolve = AlternativeValue[0].fn

describe('Resolving alternative values', () => {

	it('should concat alternative values', () => {
		expect(resolve('display', ['-webkit-flex', 'flex'], {})).to.eql({
			display: '-webkit-flex;display:flex'
		})
	})
	
	it('should use param-case', () => {
		expect(resolve('alternativeValues', ['value1', 'value2'], {})).to.eql({
			alternativeValues: 'value1;alternative-values:value2'
			})
	})
})