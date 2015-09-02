import {Config} from '../../../lib/index';
import {expect} from 'chai';

let func = (selector) => {
	return selector ? 42 : true;
}
let func2 = (selector) => {
	return selector ? 42 : false;
}


describe('Using global processor API', () => {
	it('should be possible to add a processor', () => {
			Config.registerProcessor('test');
			expect(Config.getProcessors()).to.eql(new Set([['test']]));
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