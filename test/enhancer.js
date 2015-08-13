import React from 'react';
import Look from '../lib/index';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let expect = Chai.expect;
Chai.use(sinonChai);



describe('Enhancing React.Component with Look', () => {
	
	class Test extends React.Component {
		constructor(){
			super(...arguments);
			this.state = {foo: 1}
		}
		processors(){
				return ['Processor1', 'Processor2']
		}
	}
	
	var Enhanced = Look(Test);
	var instance = new Enhanced({bar: 1});
	
	it('should use the same displayName', () => {
			expect(instance.displayName).to.eql(Test.displayName);
	});
	it('should set up initial state', () => {
			expect(instance.state).to.have.property('_look');
	});
	it('should add an array which registers all clicked items', () => {
			expect(instance._lastActive).to.exist.and.to.be.instanceof(Array);
	});
	it('should merge existing state', () => {
			expect(instance.state).to.eql({foo: 1, _look : new Map()});
	});
	
	it('should recieve props', () => {
			expect(instance.props).to.eql({bar: 1});
	});
	it('should resolve processors() as a prop', () => {
			expect(instance.processors).to.eql(['Processor1', 'Processor2']);
	});
	
	var constructorFunc = sinon.spy();
	var callMe = sinon.spy();
	
	class Test2 extends React.Component {
		constructor(){
			super();
			constructorFunc();
		}
		processors(){
			return 'processor';
		}
		render(){
			callMe();
			return null;
		}
	}
	var Enhanced2 = Look(Test2);
	var instance2 = new Enhanced2();
	instance2.render();
	it('should call super (constructor) only once', () => {
			expect(constructorFunc).to.have.been.calledOnce;
	});
	
	it('should call super.render only once', () => {
			expect(callMe).to.have.been.calledOnce;
	});
	
	it('should arrayify any kind of processors passed', () => {
			expect(instance2.processors).to.eql(['processor']);
	});
	
	class Test3 extends React.Component {
		processors() {
			return 'processor'
		}
	}
	var Enhanced3 = Look(Test3, {}, ['proc1', 'proc2']);
	var instance3 = new Enhanced3();
	it('should add additional processors', () => {
			expect(instance3.processors).to.eql(['processor', 'proc1', 'proc2']);
	});
	
	
	
});