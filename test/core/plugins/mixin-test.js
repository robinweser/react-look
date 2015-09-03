import {expect} from 'chai'
import Mixins from '../../../lib/core/plugins/mixin'

describe('Resolving mixins', () => {
	it('should not modify anything', () => {
		let styles = {
			_default: {
				color: 'blue'
			}
		}
		expect(Mixins.process(styles, {})).to.eql({
			_default: {
				color: 'blue'
			}
		})
	})
	
	
	function mixin(obj){
		return {color: obj.color + 'test'}
	}
	
	let Component = {
		mixins : {
			mixin: mixin
		}
	}
	
	it('should add resolved mixins styles', () => {
		let styles = {
			_default: {
				fontSize: 15,
				mixin : {color:'blue'}
			}
		}
		expect(Mixins.process(styles, Component)).to.eql({
			_default: {
				fontSize: 15,
				color: 'bluetest'
			}
		})
	})
	
	it('should overwrite resolved mixins styles', () => {
		let styles = {
			_default: {
				color: 'red',
				mixin : {color:'blue'}
			}
		}
		expect(Mixins.process(styles, Component)).to.eql({
			_default: {
				color: 'bluetest'
			}
		})
	})
})