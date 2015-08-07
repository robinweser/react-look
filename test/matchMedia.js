import * as matchMedia from '../lib/utils/matchMedia';
import {expect} from 'chai';


describe('Using matchMedia API', () => {
	it('should not be able to matchMedia', () => {
			expect(matchMedia.canMatchMedia()).to.equal(false);
	});

	it('matching should return false', () => {
			expect(matchMedia.match('@media (min-height: 400px)')).to.equal(false);
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
			expect(matchMedia.match('selector')).to.equal(42);
	});
});