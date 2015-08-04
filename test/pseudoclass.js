import evaluatePseudoClass from '../src/utils/evaluator/pseudo';
import {expect} from 'chai';

describe('evaluating child-index sensitives', () => {

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