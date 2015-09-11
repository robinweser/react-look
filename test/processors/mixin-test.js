import { expect } from 'chai'
import mixinTypes  from '../../lib/utils/mixinTypes'
import Mixins from '../../lib/processors/mixin'


let equalMixin =	{type: mixinTypes.EQUAL, key:'foo', fn: () => {return true}}
let includeMixin = {type: mixinTypes.INCLUDE, key:'bar', fn: () => {return true}}
let beginWithMixin =  {type: mixinTypes.BEGINWITH, key:'bla', fn: () => {return true}}


describe('Validating mixins', () => {
	it('should return true', () => {
		expect(Mixins.isMixin('foo',equalMixin)).to.equal(true)
		expect(Mixins.isMixin('fo-bar-o',includeMixin)).to.equal(true)
		expect(Mixins.isMixin('blaba',beginWithMixin)).to.equal(true)
	})
	
	it('should return false', () => {
		expect(Mixins.isMixin('foobar',equalMixin)).to.equal(false)
		expect(Mixins.isMixin('fo-ba-ro',includeMixin)).to.equal(false)
		expect(Mixins.isMixin('babla',beginWithMixin)).to.equal(false)
	})
})

describe('Getting correct mixin to resolve', () => {
	let mixins = [equalMixin, includeMixin, beginWithMixin]
	
	it('should return the correct mixin', () => {
		expect(Mixins.getMixin('foo', mixins)).to.eql(equalMixin)
		expect(Mixins.getMixin('fo-bar-o', mixins)).to.eql(includeMixin)
		expect(Mixins.getMixin('blaba', mixins)).to.eql(beginWithMixin)
	})
})


describe('Resolving mixins', () => {
	it('should not modify anything', () => {
		let styles = {
			_default: {
				color: 'blue'
			}
		}
		expect(Mixins.process(styles, {Component : {}})).to.eql({
			_default: {
				color: 'blue'
			}
		})
	})
	
	var Component = {
		mixins : [{
			key: 'colorMixin',
			type: mixinTypes.EQUAL,
			fn: (key, styles, args) => {
					return {color: styles.color + 'test'}
			}
		}]
	}
	
	it('should add resolved mixins styles', () => {
		let styles = {
			_default: {
				fontSize: 15,
				colorMixin : {color:'blue'}
			}
		}
		expect(Mixins.process(styles, {Component:Component})).to.eql({
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
				colorMixin : {color:'blue'}
			}
		}
		expect(Mixins.process(styles, {Component:Component})).to.eql({
			_default: {
				color: 'bluetest'
			}
		})
	})
})