import evaluatePseudoClass from '../../../lib/modules/evaluator/pseudo';
import {expect} from 'chai';

describe('Evaluating user-action pseudo classes', () => {
	var keyStates = {
		':hover': new Map([
			['hover', true]
		]),
		':focus': new Map([
			['focus', true]
		]),
		':active': new Map([
			['active', true]
		])
	}

	var keyStatesFalse = {
		':hover': new Map([
			['hover', false]
		]),
		':focus': new Map([
			['focus', false]
		]),
		':active': new Map([
			['active', false]
		])
	}

	var state;
	for (state in keyStates){
		
		it(state + ' should return true', () => {
			expect(evaluatePseudoClass(state, {}, keyStates[state], {})).to.equal(true);
		});
		
		
		it(state + ' should return false', () => {
			expect(evaluatePseudoClass(state, {}, keyStatesFalse[state], {})).to.equal(false);
		});
		
		
		it(state + ' should return false with empty keyState', () => {
			expect(evaluatePseudoClass(state, {}, new Map(), {})).to.equal(false);
		});
	}
});