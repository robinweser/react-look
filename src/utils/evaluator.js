import * as Validator from './validator';
import evaluateMediaQuery from './evaluator/media'
import evaluateCondition from './evaluator/condition'
import evaluatePseudoClass from './evaluator/pseudo'

export default function evaluateExpression(expression, container, element, key, childProps) {
	//eval media queries
	if (Validator.isMediaQuery(expression)) {
		evaluateMediaQuery(expression);
	}
	//eval conditions
	else if (Validator.isCondition(expression)) {
		let matchValues = container._matchValues
		evaluateCondition(expression, matchValues);
	}
	//eval pseudos
	else if (Validator.isPseudo(expression)) {
		evaluatePseudoClass(expression, container, element, key, childProps);
	} else {
		return false;
	}
}