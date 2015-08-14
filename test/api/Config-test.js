import {Config} from '../../lib/index';
import {expect} from 'chai';

let func = (selector) => {
	return selector ? 42 : true;
}
let func2 = (selector) => {
	return selector ? 42 : false;
}

describe('Using Config matchMedia API', () => {
	it('should not be possible to matchMedia', () => {
			expect(Config.canMatchMedia()).to.equal(false);
	});

	it('should be possible to set a custom matchMedia', () => {
		Config.setMatchMedia(func);
			expect(Config.canMatchMedia()).to.equal(true);
	});
	
	it('should be possible to get the (new) current matchMedia', () => {
			expect(Config.getMatchMedia()).to.equal(func);
	});
	
	it('should be possible to use the matchMedia method', () => {
			expect(Config.getMatchMedia()('test')).to.equal(42);
	});
});

describe('Using global processor API', () => {
	it('should be possible to add a processor', () => {
			Config.registerProcessor('test');
			expect(Config.getProcessors()).to.eql(new Map([['test', []]]));
	});
	
	it('should be possible to apply special arguments with a processor', () => {
			Config.registerProcessor('test2', [1,2]);
			expect(Config.getProcessorArgs('test2')).to.eql([1,2]);
	});
	
	it('should be possible to overwrite an existing processor', () => {
			Config.registerProcessor('test', [1]);
			expect(Config.getProcessors().get('test')).to.eql([1]);
	});
	
	it('should be possible to deregister an existing processor', () => {
			Config.deregisterProcessor('test');
			expect(Config.getProcessors().has('test')).to.equal(false);
	});
});

describe('Using global mixin API', () => {
	it('should be possible to add a mixin property', () => {
			Config.registerMixin('test', func);
			expect(Config.getMixins()).to.eql(new Map([['test', func]]));
	});
	
	it('should be possible to overwrite an existing mixins function', () => {
			Config.registerMixin('test', func2);
			expect(Config.getMixinFn('test')).to.equal(func2);
	});
	
	it('should be possible to deregister an existing mixin property', () => {
			Config.deregisterMixin('test');
			expect(Config.getMixins().has('test')).to.equal(false);
	});
});