import {extractCSS} from '../../lib/mixins/extract-css'
import {expect} from 'chai'


describe('Extracting classNames', () => {

	it('should extract css to classNames', () => {
		let args ={newProps : {}}
		
		extractCSS('css', 'foo', args)
		expect(args.newProps).to.eql({className: 'foo'});
	});
	
	it('should concat css if a className already exists', () => {
		let args ={newProps : {className: 'bar'}}
		
		extractCSS('css', 'foo', args)
		expect(args.newProps).to.eql({className: 'bar foo'});
	});
});

