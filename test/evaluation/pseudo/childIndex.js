import evaluatePseudoClass from '../../../lib/utils/evaluator/pseudo';
import {expect} from 'chai';

describe('Evaluating child-index sensitive pseudo classes', () => {

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
					expect(evaluatePseudoClass(condition, {}, 'root', childProps).toString()).to.equal(bool);
				});
			}
		}
	}
});


describe('Evaluating :nth-child pseudo class', () => {

	const conditions = {
		':nth-child(even)': {
			1: false,
			2: true,
			3: false,
			4: true
		},
		':nth-child(odd)': {
			1: true,
			2: false,
			3: true,
			4: false
		},
		':nth-child(3n+2)' : {
			1: false,
			2: true,
			3: false,
			5: true,
			7: false,
			8: true
		},
		':nth-child(-2n+3)' : {
			1 : true,
			2: false,
			3: true,
			4: false,
			5: false
		},
		':nth-child(n+3)': {
			1: false,
			2: false,
			3: true,
			4: true,
			5: true
		},
		':nth-child(3)' : {
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
		it(condition + ' at index ' + index + ' should return ' + values[index], () => {
			expect(evaluatePseudoClass(condition, {}, 'root', {index: index})).to.equal(values[index]);
		});
	}
});

const length = 5;
	
describe('Evaluating :nth-last-child pseudo class with '+ length + ' elements', () => {
	
	const conditions = {
		':nth-last-child(even)': {
			1: false,
			2: true,
			3: false,
			4: true,
			5: false
		},
		':nth-last-child(odd)': {
			1: true,
			2: false,
			3: true,
			4: false,
			5: true
		},
		':nth-last-child(3n+2)' : {
			1: true,
			2: false,
			3: false,
			4: true,
			5: false
		},
		':nth-last-child(-2n+3)' : {
			1 : false,
			2: false,
			3: true,
			4: false,
			5: true
		},
		':nth-last-child(n+3)': {
			1: true,
			2: true,
			3: true,
			4: false,
			5: false
		},
		':nth-last-child(3)' : {
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
		it(condition + ' at index ' + index + ' should return ' + values[index], () => {
			expect(evaluatePseudoClass(condition, {}, 'root', {index: index, length: length})).to.equal(values[index]);
		});
	}
});