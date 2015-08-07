import * as Validator from '../lib/utils/validator';
import {expect} from 'chai';


describe('Validating selectors', () => {
	it(':focus should validate as a pseudo class', () => {
			expect(Validator.isPseudo(':focus')).to.equal(true);
	});
	it('test should not validate as a pseudo class', () => {
			expect(Validator.isPseudo('test')).to.equal(false);
	});
	it('@media(min-width: 500px) should validate as a media query', () => {
			expect(Validator.isMediaQuery('@media (min-width: 500px)')).to.equal(true);
	});
	it('@selector should not validate as a media query', () => {
			expect(Validator.isMediaQuery('@selector')).to.equal(false);
	});
	it('selector should not validate as a media query', () => {
			expect(Validator.isMediaQuery('selector')).to.equal(false);
	});
	it('foo=bar should validate as a condition', () => {
			expect(Validator.isCondition('foo=bar')).to.equal(true);
	});
	it('foo!=bar should validate as a condition', () => {
			expect(Validator.isCondition('foo!=bar')).to.equal(true);
	});
	it('foo>=bar should validate as a condition', () => {
			expect(Validator.isCondition('foo>=bar')).to.equal(true);
	});
	it('foo<=bar should validate as a condition', () => {
			expect(Validator.isCondition('foo<=bar')).to.equal(true);
	});
	it('foo>bar should validate as a condition', () => {
			expect(Validator.isCondition('foo>bar')).to.equal(true);
	});
	it('foo<bar should validate as a condition', () => {
			expect(Validator.isCondition('foo<bar')).to.equal(true);
	});
	it('selector should not validate as a condition', () => {
			expect(Validator.isCondition('selector')).to.equal(false);
	});
});

describe('Validating numbers', () => {
	it('10 should validate as a number', () => {
			expect(Validator.isNumber(10)).to.equal(true);
	})
	it('"10" should validate as a number', () => {
			expect(Validator.isNumber('10')).to.equal(true);
	})
	it('4.0 should validate as a number', () => {
			expect(Validator.isNumber(4.0)).to.equal(true);
	})
	it('"4.0" should validate as a number', () => {
			expect(Validator.isNumber('4.0')).to.equal(true);
	})
	it('0 should validate as a number', () => {
			expect(Validator.isNumber(0)).to.equal(true);
	})
	it('Inifinity should not validate as a number', () => {
			expect(Validator.isNumber(Infinity)).to.equal(false);
	})
	it('"Infinity" should not validate as a number', () => {
			expect(Validator.isNumber('Infinity')).to.equal(false);
	})
});

describe('Validating empty objects', () => {
	it('{} should validate as an empty object', () => {
			expect(Validator.isEmpty({})).to.equal(true);
	})
	it('undefined should validate as an empty object', () => {
			expect(Validator.isEmpty(undefined)).to.equal(true);
	})
	it('{foo: 1} should not validate as an empty object', () => {
			expect(Validator.isEmpty({foo: 1})).to.equal(false);
	})
});