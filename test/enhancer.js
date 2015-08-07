import React from 'react';
import Look from '../lib/index';
import {expect} from 'chai';



describe('Enhancing React.Component with Look', () => {
	class Test extends React.Component {}
	var enhanced = Look(Test);
	var instance = new enhanced();
	
	it('should use the same displayName', () => {
			expect(instance.displayName).to.eql(Test.displayName);
	});
	
	it('should set up initial state', () => {
			expect(instance.state).to.eql({_look : new Map()});
	});
	
	class Stateful extends Test {
		constructor(){
			super(...arguments);
			this.state = {foo: 1}
		}
	}
	var enhancedStateful = Look(Stateful);
	var statefulInstance = new enhancedStateful({bar: 1});
	it('should merge existing state', () => {
			expect(statefulInstance.state).to.eql({foo: 1, _look : new Map()});
	});
	
	it('should recieve props', () => {
			expect(statefulInstance.props).to.eql({bar: 1});
	});
});