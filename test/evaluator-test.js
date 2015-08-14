import evaluateCondition from '../lib/modules/evaluator/condition';
import evaluatePseudoClass from '../lib/modules/evaluator/pseudo';

import {
	expect
}
from 'chai';


describe('Evaluating conditions', () => {

	var matchValues = {
		highlight: true,
		clicks: 20,
		noprop: undefined
	};
	
	it('should validate true', () => {
	 expect(evaluateCondition('highlight=true', matchValues)).to.equal(true);
		expect(evaluateCondition('clicks>10', matchValues)).to.equal(true);
		expect(evaluateCondition('clicks!=15', matchValues)).to.equal(true);
		expect(evaluateCondition('clicks>=20', matchValues)).to.equal(true);
		expect(evaluateCondition('clicks>=19', matchValues)).to.equal(true);
		expect(evaluateCondition('noprop=undefined', matchValues)).to.equal(true);
		expect(evaluateCondition('clicks!=undefined', matchValues)).to.equal(true);
	});


	it('should validate false', () => {
		expect(evaluateCondition('clicks<10', matchValues)).to.equal(false);
		expect(evaluateCondition('border=2px', matchValues)).to.equal(false);
		expect(evaluateCondition('clicks!=20', matchValues)).to.equal(false);
		expect(evaluateCondition('clicks<=10', matchValues)).to.equal(false);
		expect(evaluateCondition('highlight=undefined', matchValues)).to.equal(false);
	});
});


describe('Evaluating input pseudo classes', () => {
	
	it('should valdidate true', () => {
		expect(evaluatePseudoClass(':checked', {checked: true}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':enabled', {disabled: false}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':disabled', {disabled: true}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':required', {required: true}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':optional', {required: false}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':read-only', {readOnly: true}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':read-write', {readOnly: false}, new Map(), {})).to.equal(true);
		expect(evaluatePseudoClass(':indeterminate', {indeterminate: true}, new Map(), {})).to.equal(true);
	});
	
	
	it('should valdidate false', () => {
		expect(evaluatePseudoClass(':checked', {checked: false}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':enabled', {disabled: true}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':disabled', {disabled: false}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':required', {required: false}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':optional', {required: true}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':read-only', {readOnly: false}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':read-write', {readOnly: true}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':indeterminate', {indeterminate: false}, new Map(), {})).to.equal(false);
	});
});


describe('Evaluating user-action pseudo classes', () => {
	it('should return true if keyState is set and true', () => {
		expect(evaluatePseudoClass(':hover', {}, new Map([['hover' , true]]), {})).to.equal(true);
		expect(evaluatePseudoClass(':focus', {}, new Map([['focus' , true]]), {})).to.equal(true);
		expect(evaluatePseudoClass(':active', {}, new Map([['active' , true]]), {})).to.equal(true);
	});
		
		
	it('should return false if keyState is set but false', () => {
		expect(evaluatePseudoClass(':hover', {}, new Map([['hover' , false]]), {})).to.equal(false);
		expect(evaluatePseudoClass(':focus', {}, new Map([['focus' , false]]), {})).to.equal(false);
		expect(evaluatePseudoClass(':active', {}, new Map([['active' , false]]), {})).to.equal(false);
	});
		
	
	it('should return false if keyState is empty', () => {
		expect(evaluatePseudoClass(':hover', {}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':focus', {}, new Map(), {})).to.equal(false);
		expect(evaluatePseudoClass(':active', {}, new Map(), {})).to.equal(false);
	});
});


describe('Evaluating :lang pseudo class', () => {
	
	it('should validate true', () => {
			expect(evaluatePseudoClass(':lang(en)', {lang: 'en'}, new Map(), {})).to.equal(true);
	});
	
	
	it('should validate false', () => {
			expect(evaluatePseudoClass(':lang(en)', {lang: 'de'}, new Map(), {})).to.equal(false);
	});
});
	
	
describe('Evaluating :empty pseudo class', () => {
	
	it('should validate true with empty children', () => {
			expect(evaluatePseudoClass(':empty', {children: []}, new Map(), {})).to.equal(true);
	});
	
	
	it('should validate true if element got no children', () => {
			expect(evaluatePseudoClass(':empty', {}, new Map(), {})).to.equal(true);
	});
	
	
	it('should validate false if element got children', () => {
			expect(evaluatePseudoClass(':empty', {children: ['test']}, new Map(), {})).to.equal(false);
	});
});
