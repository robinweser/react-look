import {expect} from 'chai'
import {Component} from 'react'
import Look, {flattenStyles, prepareStyles} from '../../lib/core/enhancer'

describe('Enhancing a Component', () => {
	it('should use the same displayName', () => {
		class Default extends Component {}
		let Enhanced = Look(Default)
		let instance = new Enhanced()

		expect(instance.displayName).to.eql(Default.displayName);
	})
	
	it('should set up initial state', () => {
		class Default extends Component {}
		let Enhanced = Look(Default);
		let instance = new Enhanced();

		expect(instance.state).to.have.property('_look');
	})


	it('should add an array which registers all clicked items', () => {
		class Default extends Component {}
		let Enhanced = Look(Default);
		let instance = new Enhanced();

		expect(instance._lastActiveElements).to.exist.and.to.be.instanceof(Array);
	})
	
	
	it('should merge existing state', () => {
		class Default extends Component {
			constructor() {
				super(...arguments);
				this.state = {
					foo: 1
				}
			}
		}

		let Enhanced = Look(Default);
		let instance = new Enhanced();

		expect(instance.state).to.eql({
			foo: 1,
			_look: new Map()
		})
	})


	it('should recieve props', () => {
		class Default extends Component {
			constructor() {
				super(...arguments);
			}
		}

		let Enhanced = Look(Default);
		let instance = new Enhanced({
			bar: 1
		})

		expect(instance.props).to.eql({
			bar: 1
		})
	})
})


describe('Flattening styles', () => {
	it('should return the input object', () => {
		let input = {
			color: 'red'
		}
		expect(flattenStyles(input)).to.eql(input);
	})
	
	it('should merge an array of multiple objects', () => {
		let base = {
			color: 'red',
			fontSize: 15
		}
		let extend = {
			color: 'blue'
		}
		expect(flattenStyles([base, extend])).to.eql({color: 'blue', fontSize: 15})
	})
	
	it('should warn and return an empty object', () => {
		expect(flattenStyles(23)).to.eql({})
	})
	
	it('should call functions and return the flattened output', () => {
		function style(){
			return {
				color: 'red'
			}
		}
		expect(flattenStyles(style)).to.eql({color: 'red'})
	})
})

describe('Preparing look styles', () => {
	it('should add a default selector', () => {
		class Default extends Component {}
		Default.look = {color: 'red'}
		expect(prepareStyles(Default)).to.eql({'_default' : {color: 'red'}});
	})
})