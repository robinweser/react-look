import evaluatePseudoClass from '../../lib/utils/evaluator/pseudo';
import {evalNth} from '../../lib/utils/evaluator/eval';
import {expect} from 'chai';

describe('Evaluating child-index sensitives', () => {

	const conditions = {
		':first-child': {
			'true': [
				[1, 1, 1, 1],
				[1, 1, 2, 2]
			],
			'false': [
				[2, 2, 1, 1]
			]
		},
		':last-child': {
			'true': [
				[1, 1, 1, 1],
				[2, 2, 1, 1]
			],
			'false': [
				[1, 3, 2, 2]
			]
		},
		':first-of-type': {
			'true': [
				[1, 1, 1, 1],
				[2, 3, 1, 2]
			],
			'false': [
				[2, 2, 2, 2],
				[3, 4, 2, 3]
			]
		},
		':last-of-type': {
			'true': [
				[1, 1, 1, 1],
				[2, 2, 2, 2]
			],
			'false': [
				[2, 3, 1, 2],
				[3, 4, 2, 3]
			]
		},
		':only-child': {
			'true': [
				[1, 1, 1, 1]
			],
			'false': [
				[1, 2, 1, 2]
			]
		}
	}

	const mockedState = {
		state: {
			_look: new Map()
		}
	}

	var condition;
	for (condition in conditions) {
		var values = conditions[condition];

		var bool;
		for (bool in values)  {

			for (var i = 0; i < values[bool].length; ++i) {
				var arr = values[bool][i];
				
				var childProps = {
					'index': arr[0],
					'length': arr[1],
					'typeIndex': arr[2],
					'typeIndexLength': arr[3]
				}

				var str = '[' + arr.join(', ') + ']';

				it(condition + ' with childProps: ' + str + ' should return ' + bool, () => {
					expect(evaluatePseudoClass(condition, mockedState, {}, 'root', childProps).toString())
						.to.equal(bool);
				});
			}
		}
	}
});


describe('Evaluating nth-child', () => {

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
		},
		'3' : {
			1: false,
			2: false,
			3: true,
			4: false
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
	
describe('Evaluating nth-last-child with '+ length + ' elements', () => {
	
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
		},
		'3' : {
			1: false,
			2: false,
			3: true,
			4: false
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