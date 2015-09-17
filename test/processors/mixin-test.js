import { expect } from 'chai'
import MixinTypes  from '../../lib/utils/MixinTypes'
import Mixins, {isMixin, getMixins} from '../../lib/processors/mixin'


let equalMixin =	{type: MixinTypes.EQUAL, key:'foo', fn: () => {return true}}
let includeMixin = {type: MixinTypes.INCLUDE, key:'bar', fn: () => {return true}}
let beginWithMixin =  {type: MixinTypes.BEGINWITH, key:'bla', fn: () => {return true}}
let regexMixin =  {type: MixinTypes.REGEX, key:/test/, fn: () => {return true}}

describe('Validating mixins', () => {
	it('should return true', () => {
		expect(isMixin('foo',equalMixin)).to.equal(true)
		expect(isMixin('fo-bar-o',includeMixin)).to.equal(true)
		expect(isMixin('blaba',beginWithMixin)).to.equal(true)
		expect(isMixin('testest', regexMixin)).to.equal(true)
	})
	
	it('should return false', () => {
		expect(isMixin('foobar',equalMixin)).to.equal(false)
		expect(isMixin('fo-ba-ro',includeMixin)).to.equal(false)
		expect(isMixin('babla',beginWithMixin)).to.equal(false)
		expect(isMixin('teest', regexMixin)).to.equal(false)
	})
})

describe('Getting correct mixin to resolve', () => {
	let mixins = [equalMixin, includeMixin, beginWithMixin]
	
	it('should return the correct mixin', () => {
		expect(getMixins('foo', mixins)).to.eql([equalMixin])
		expect(getMixins('fo-bar-o', mixins)).to.eql([includeMixin])
		expect(getMixins('blaba', mixins)).to.eql([beginWithMixin])
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
			type: MixinTypes.EQUAL,
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