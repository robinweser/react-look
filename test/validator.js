import * as Validator from '../lib/modules/validator';
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