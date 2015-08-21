import evaluateCondition from '../lib/modules/evaluator/condition';
import evaluatePseudoClass from '../lib/modules/evaluator/pseudo';
import {expect} from 'chai';

describe('Evaluating conditions', () => {

	let matchValues = {
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



describe('Evaluating child index pseudo class', () => {
	
	it(':nth-last-child should validate true', () => {
		expect(evaluatePseudoClass(':nth-last-child(even)', {}, new Map(), {length: 5, index: 2})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(even)', {}, new Map(), {length: 5, index: 4})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-last-child(odd)', {}, new Map(), {length: 5, index: 1})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(odd)', {}, new Map(), {length: 5, index: 3})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(odd)', {}, new Map(), {length: 5, index: 5})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-last-child(3n+2)', {}, new Map(), {length: 5, index: 1})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(3n+2)', {}, new Map(), {length: 5, index: 4})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-last-child(-2n+3)', {}, new Map(), {length: 5, index: 3})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(-2n+3)', {}, new Map(), {length: 5, index: 5})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-last-child(n+3)', {}, new Map(), {length: 5, index: 1})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(n+3)', {}, new Map(), {length: 5, index: 2})).to.equal(true);
		expect(evaluatePseudoClass(':nth-last-child(n+3)', {}, new Map(), {length: 5, index: 3})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-last-child(3)', {}, new Map(), {length: 5, index: 3})).to.equal(true);	
	});
	
 
	it(':nth-last-child should validate false', () => {
		expect(evaluatePseudoClass(':nth-last-child(even)', {}, new Map(), {length: 5, index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(even)', {}, new Map(), {length: 5, index: 3})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(even)', {}, new Map(), {length: 5, index: 5})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-last-child(odd)', {}, new Map(), {length: 5, index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(odd)', {}, new Map(), {length: 5, index: 4})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-last-child(3n+2)', {}, new Map(), {length: 5, index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(3n+2)', {}, new Map(), {length: 5, index: 3})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(3n+2)', {}, new Map(), {length: 5, index: 5})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-last-child(-2n+3)', {}, new Map(), {length: 5, index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(-2n+3)', {}, new Map(), {length: 5, index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(-2n+3)', {}, new Map(), {length: 5, index: 4})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-last-child(n+3)', {}, new Map(), {length: 5, index: 4})).to.equal(false);
		expect(evaluatePseudoClass(':nth-last-child(n+3)', {}, new Map(), {length: 5, index: 5})).to.equal(false);

		expect(evaluatePseudoClass(':nth-last-child(3)', {}, new Map(), {length: 5, index: 1})).to.equal(false);	
		expect(evaluatePseudoClass(':nth-last-child(3)', {}, new Map(), {length: 5, index: 2})).to.equal(false);	
		expect(evaluatePseudoClass(':nth-last-child(3)', {}, new Map(), {length: 5, index: 4})).to.equal(false);	
		expect(evaluatePseudoClass(':nth-last-child(3)', {}, new Map(), {length: 5, index: 5})).to.equal(false);	
	});
	
	
	it(':nth-child should validate true', () => {
		expect(evaluatePseudoClass(':nth-child(even)', {}, new Map(), {index: 2})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(even)', {}, new Map(), {index: 4})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-child(odd)', {}, new Map(), {index: 1})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(odd)', {}, new Map(), {index: 3})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 2})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 5})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 8})).to.equal(true);
					
		expect(evaluatePseudoClass(':nth-child(-2n+3)', {}, new Map(), {index: 1})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(-2n+3)', {}, new Map(), {index: 3})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-child(-3n+5)', {}, new Map(), {index: 2})).to.equal(true);
    expect(evaluatePseudoClass(':nth-child(-3n+5)', {}, new Map(), {index: 5})).to.equal(true);

		expect(evaluatePseudoClass(':nth-child(n+3)', {}, new Map(), {index: 3})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(n+3)', {}, new Map(), {index: 4})).to.equal(true);
		expect(evaluatePseudoClass(':nth-child(n+3)', {}, new Map(), {index: 5})).to.equal(true);
		
		expect(evaluatePseudoClass(':nth-child(3)', {}, new Map(), {index: 3})).to.equal(true);
	});
	
	
	it(':nth-child should validate false', () => {
		expect(evaluatePseudoClass(':nth-child(even)', {}, new Map(), {index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(even)', {}, new Map(), {index: 3})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-child(odd)', {}, new Map(), {index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(odd)', {}, new Map(), {index: 4})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 4})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 6})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(3n+2)', {}, new Map(), {index: 7})).to.equal(false);
							
		expect(evaluatePseudoClass(':nth-child(-2n+3)', {}, new Map(), {index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(-2n+3)', {}, new Map(), {index: 4})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(-2n+3)', {}, new Map(), {index: 5})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-child(n+3)', {}, new Map(), {index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(n+3)', {}, new Map(), {index: 2})).to.equal(false);
		
		expect(evaluatePseudoClass(':nth-child(3)', {}, new Map(), {index: 1})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(3)', {}, new Map(), {index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':nth-child(3)', {}, new Map(), {index: 4})).to.equal(false);
	});
	
	
	it(':first-child should validate true', () => {
		expect(evaluatePseudoClass(':first-child', {}, new Map(), {index: 1})).to.equal(true);
	});
	
	
	it(':first-child should validate false', () => {
		expect(evaluatePseudoClass(':first-child', {}, new Map(), {index: 2})).to.equal(false);
		expect(evaluatePseudoClass(':first-child', {}, new Map(), {index: 3})).to.equal(false);
	});


	it(':last-child should validate true', () => {
		expect(evaluatePseudoClass(':last-child', {}, new Map(), {index: 2, length: 2})).to.equal(true);
		expect(evaluatePseudoClass(':last-child', {}, new Map(), {index: 14, length: 14})).to.equal(true);
	});
	
	
	it(':last-child should validate false', () => {
		expect(evaluatePseudoClass(':last-child', {}, new Map(), {index: 2, length: 4})).to.equal(false);
		expect(evaluatePseudoClass(':last-child', {}, new Map(), {index: 3, length: 4})).to.equal(false);
	});


	it(':only-child should validate true', () => {
		expect(evaluatePseudoClass(':only-child', {}, new Map(), {index: 1, length: 1})).to.equal(true);
	});
	
	
	it(':only-child should validate false', () => {
		expect(evaluatePseudoClass(':only-child', {}, new Map(), {index: 1, length: 2})).to.equal(false);
		expect(evaluatePseudoClass(':only-child', {}, new Map(), {index: 2, length: 2})).to.equal(false);
	});
	
	
	it(':only-of-type should validate true', () => {
		expect(evaluatePseudoClass(':only-of-type', {}, new Map(), {typeIndex: 1, typeLength: 1})).to.equal(true);
		expect(evaluatePseudoClass(':only-of-type', {}, new Map(), {typeIndex: 1, typeLength: 1, length: 2})).to.equal(true);
	});
	
	
	it(':only-of-type should validate false', () => {
		expect(evaluatePseudoClass(':only-of-type', {}, new Map(), {typeIndex: 1, typeLength: 2})).to.equal(false);
		expect(evaluatePseudoClass(':only-of-type', {}, new Map(), {typeIndex: 2, typeLength: 2})).to.equal(false);
	});
});