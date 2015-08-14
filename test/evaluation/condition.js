import evaluateCondition from '../../lib/modules/evaluator/condition';
import {expect} from 'chai';

const matchValues = {
	highlight: true,
	clicks: 20,
	noprop : undefined
};

describe('Evaluating stateful styles: ' + JSON.stringify(matchValues), () => {

	const conditions = {
		'highlight=true': true,
		'border=2px': false,
		'clicks>10': true,
		'clicks<10': false,
		'clicks!=15': true,
		'clicks!=20': false,
		'clicks>=20' : true,
		'clicks>=19' : true,
		'clicks<=10' : false,
		'noprop=undefined' : true,
		'highlight=undefined' : false,
		'clicks!=undefined' : true
	}
	
	var condition;
	for (condition in conditions){
		it(condition + ' should return ' + conditions[condition], () => {
			expect(evaluateCondition(condition, matchValues)).to.equal(conditions[condition]);
		});
	}
});