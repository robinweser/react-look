import Config from '../../lib/api/Config';
import {expect} from 'chai';

describe('Using global processor API', () => {
	it('should be possible to add a processor', () => {
			Config.registerProcessor('test')
			expect(Config.getProcessors()).to.include('test')
	})

	it('should be possible to deregister an existing processor', () => {
			Config.deregisterProcessor('test')
			expect(Config.getProcessors()).to.not.include('test')
	});
});