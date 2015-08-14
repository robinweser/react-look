import evaluatePseudoClass from '../../../lib/modules/evaluator/pseudo';
import {expect} from 'chai';

describe('Evaluating other pseudo classes', () => {
	
	it(':lang(en) should return true if lang=en', () => {
			expect(evaluatePseudoClass(':lang(en)', {lang: 'en'}, new Map(), {})).to.equal(true);
	});
	
	
	it(':lang(en) should return false if lang=de', () => {
			expect(evaluatePseudoClass(':lang(en)', {lang: 'de'}, new Map(), {})).to.equal(false);
	});
	
	
	it(':empty should return true if element got no children', () => {
			expect(evaluatePseudoClass(':empty', {children: []}, new Map(), {})).to.equal(true);
	});
	
	
	it(':empty should return true if element got no children', () => {
			expect(evaluatePseudoClass(':empty', {}, new Map(), {})).to.equal(true);
	});
	
	
	it(':empty should return false if element got children', () => {
			expect(evaluatePseudoClass(':empty', {children: ['test']}, new Map(), {})).to.equal(false);
	});
});