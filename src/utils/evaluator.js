import * as Validator from './validator';
import evaluateMediaQuery from './evaluator/media'
import evaluateCondition from './evaluator/condition'
import evaluatePseudoClass from './evaluator/pseudo'

export default function evaluateExpression(expression, container, element, key, childProps) {
	//eval media queries
	if (Validator.isMediaQuery(expression)) {
		return evaluateMediaQuery(expression);
	}
	//eval conditions
	else if (Validator.isCondition(expression)) {
		let matchValues = container._matchValues;
		return evaluateCondition(expression, matchValues);
	}
	//eval pseudos
	else if (Validator.isPseudo(expression)) {
		return evaluatePseudoClass(expression, container, element, key, childProps);
	} else {
		return false;
	}
}