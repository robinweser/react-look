import evaluatePseudoClass from '../../../lib/modules/evaluator/pseudo';
import {expect} from 'chai';

describe('Evaluating input pseudo classes', () => {
	var props = {
		':checked': {
			checked: true
		},
		':enabled': {
			disabled: false
		},
		':disabled': {
			disabled: true
		},
		':required': {
			required: true
		},
		':optional': {
			required: false
		},
		':read-only': {
			readOnly: true
		},
		':read-write': {
			readOnly: false
		},
		':indeterminate': {
			indeterminate: true
		}
	}

	var falseProps = {
		':checked': {
			checked: false
		},
		':enabled': {
			disabled: true
		},
		':disabled': {
			disabled: false
		},
		':required': {
			required: false
		},
		':optional': {
			required: true
		},
		':read-only': {
			readOnly: false
		},
		':read-write': {
			readOnly: true
		},
		':indeterminate': {
			indeterminate: false
		}
	}

	var prop;
	for (prop in props) {
		it(prop + ' should return true', () => {
			expect(evaluatePseudoClass(prop, props[prop], new Map(), {})).to.equal(true);
		});
		it(prop + ' should return false', () => {
			expect(evaluatePseudoClass(prop, falseProps[prop], new Map(), {})).to.eql(false);
		});
	}
});