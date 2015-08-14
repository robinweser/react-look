import {matchMedia} from '../lib/index';
import {expect} from 'chai';


describe('Using matchMedia API', () => {
	it('should not be able to matchMedia', () => {
			expect(matchMedia.canMatchMedia()).to.equal(false);
	});
	
	var func = function(selector){
		return selector ? 42 : true;
	}
	
	it('should be able to set a custom matchMedia', () => {
		matchMedia.setMatchMedia(func);
		
			expect(matchMedia.canMatchMedia()).to.equal(true);
	});
	
	it('should be able to get the (new) current matchMedia', () => {
			expect(matchMedia.getMatchMedia()).to.equal(func);
	});
	
	it('should be able to call the matchMedia function', () => {
			expect(matchMedia.getMatchMedia()('selector')).to.equal(42);
	});
});