import {evalNth} from '../src/utils/evaluator/eval';
import {expect} from 'chai';



describe('evaluating nth-child: ', () => {

	const conditions = {
		'even': {
			1: false,
			2: true,
			3: false,
			4: true
		},
		'odd': {
			1: true,
			2: false,
			3: true,
			4: false
		},
		'3n+2' : {
			1: false,
			2: true,
			3: false,
			5: true,
			7: false,
			8: true
		},
		'-2n+3' : {
			1 : true,
			2: false,
			3: true,
			4: false,
			5: false
		},
		'n+3': {
			1: false,
			2: false,
			3: true,
			4: true,
			5: true
		}
	}
	
	var condition;
	for (condition in conditions) {
		var values = conditions[condition];
		var index;
		for (index in values)
		it('nth-child(' + condition + ') at index ' + index + ' should return ' + values[index], () => {
			expect(evalNth(condition, index))
				.to.equal(values[index]);
		});
	}
});

const length = 5;
	
describe('evaluating nth-last-child with '+ length + ' elements:', () => {
	
	const conditions = {
		'even': {
			1: false,
			2: true,
			3: false,
			4: true,
			5: false
		},
		'odd': {
			1: true,
			2: false,
			3: true,
			4: false,
			5: true
		},
		'3n+2' : {
			1: true,
			2: false,
			3: false,
			4: true,
			5: false
		},
		'-2n+3' : {
			1 : false,
			2: false,
			3: true,
			4: false,
			5: true
		},
		'n+3': {
			1: true,
			2: true,
			3: true,
			4: false,
			5: false
		}
	}
	
	var condition;
	for (condition in conditions) {
		var values = conditions[condition];
		var index;
		for (index in values)
		it('nth-last-child(' + condition + ') at index ' + index + ' should return ' + values[index], () => {
			expect(evalNth(condition, length - index, true))
				.to.equal(values[index]);
		});
	}
});