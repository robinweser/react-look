import {Config} from '../../lib/index';
import {expect} from 'chai';


describe('Using Config.matchMedia API', () => {
	it('should not be able to matchMedia', () => {
			expect(Config.canMatchMedia()).to.equal(false);
	});

	
	var func = function(selector){
		return selector ? 42 : true;
	}
	
	it('should be able to set a custom matchMedia', () => {
		Config.setMatchMedia(func);
		
			expect(Config.canMatchMedia()).to.equal(true);
	});
	
	it('should be able to get the (new) current matchMedia', () => {
			expect(Config.getMatchMedia()).to.equal(func);
	});
});