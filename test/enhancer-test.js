import React from 'react';
import Look from '../lib/index';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let expect = Chai.expect;
Chai.use(sinonChai);



describe('Enhancing React.Component with Look', () => {

	it('should use the same displayName', () => {
		class Test extends React.Component {}
		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(instance.displayName).to.eql(Test.displayName);
	});


	it('should set up initial state', () => {
		class Test extends React.Component {}
		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(instance.state).to.have.property('_look');
	});


	it('should add an array which registers all clicked items', () => {
		class Test extends React.Component {}
		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(instance._lastActive).to.exist.and.to.be.instanceof(Array);
	});


	it('should merge existing state', () => {
		class Test extends React.Component {
			constructor() {
				super(...arguments);
				this.state = {
					foo: 1
				}
			}
		}

		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(instance.state).to.eql({
			foo: 1,
			_look: new Map()
		});
	});


	it('should recieve props', () => {
		class Test extends React.Component {
			constructor() {
				super(...arguments);
			}
		}

		let Enhanced = Look(Test);
		let instance = new Enhanced({
			bar: 1
		});

		expect(instance.props).to.eql({
			bar: 1
		});
	});


	it('should resolve processors() as a prop', () => {
		class Test extends React.Component {
			processors() {
				return ['Processor1', 'Processor2']
			}
		}

		let Enhanced = Look(Test);
		let instance = new Enhanced();
		expect(instance.processors).to.eql(['Processor1', 'Processor2']);
	});


	it('should arrayify any kind of processors passed', () => {
		class Test extends React.Component {
			processors() {
				return 'processor';
			}
		}
		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(instance.processors).to.eql(['processor']);
	});


	it('should add additional processors', () => {
		class Test extends React.Component {
			processors() {
				return 'processor'
			}
		}
		let Enhanced = Look(Test, {}, ['proc1', 'proc2']);
		let instance = new Enhanced();

		expect(instance.processors).to.eql(['processor', 'proc1', 'proc2']);
	});


	it('should call super (constructor) only once', () => {
		let constructorFunc = sinon.spy();

		class Test extends React.Component {
			constructor() {
				super();
				constructorFunc();
			}
		}

		let Enhanced = Look(Test);
		let instance = new Enhanced();

		expect(constructorFunc).to.have.been.calledOnce;
	});


	it('should call super.render only once', () => {
		let callMe = sinon.spy();

		class Test extends React.Component {
			render() {
				callMe();
				return null;
			}
		}
		let Enhanced = Look(Test);
		let instance = new Enhanced();
		instance.render();

		expect(callMe).to.have.been.calledOnce;
	});
});