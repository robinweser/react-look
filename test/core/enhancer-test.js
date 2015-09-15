import {Component} from 'react'
import Look, {flattenStyles, prepareStyles} from '../../lib/core/enhancer'
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let expect = Chai.expect;
Chai.use(sinonChai);

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
	
	
	
	it('should resolve processors() as a prop', () => {
		class Default extends Component {
			processors() {
				return ['Processor1', 'Processor2']
			}
		}

		let Enhanced = Look(Default)
		let instance = new Enhanced()
		expect(instance._processors).to.include.members(['Processor1', 'Processor2'])
	})


	it('should arrayify any kind of processors passed', () => {
		class Default extends Component {
			processors() {
				return 'processor'
			}
		}
		let Enhanced = Look(Default)
		let instance = new Enhanced()

		expect(instance._processors).to.include.members(['processor'])
	})


	it('should add additional processors', () => {
		class Default extends Component {
			processors() {
				return 'processor'
			}
		}
		let Enhanced = Look(Default, {}, ['proc1', 'proc2'])
		let instance = new Enhanced()

		expect(instance._processors).to.include.members(['processor', 'proc1', 'proc2'])
	})
	
	it('should call super (constructor) only once', () => {
		let constructorFunc = sinon.spy()

		class Default extends Component {
			constructor() {
				super()
				constructorFunc()
			}
		}

		let Enhanced = Look(Default)
		let instance = new Enhanced()

		expect(constructorFunc).to.have.been.calledOnce
	});


	it('should call super.render only once', () => {
		let callMe = sinon.spy()

		class Default extends Component {
			render() {
				callMe()
				return null
			}
		}
		let Enhanced = Look(Default)
		let instance = new Enhanced()
		instance.render()

		expect(callMe).to.have.been.calledOnce
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
	
	it('should warn and return false', () => {
		expect(flattenStyles(23)).to.eql(false)
	})
})

describe('Preparing look styles', () => {
	it('should add a default selector', () => {
		class Default extends Component {}
		Default.look = {color: 'red'}
		expect(prepareStyles(Default)).to.eql({'_default' : {color: 'red'}});
	})
})