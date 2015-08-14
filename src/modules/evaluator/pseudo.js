import {
	validateSelector
}
from '../validator';

/**
 * Evaluates if a pseudo class fullfils its condition
 * @param {string} pseudo - pseudo-class that gets evaluated
 * @param {Object} props - elements props that get used to evaluate pseudos
 * @param {Map} keyState - stores information on elements current user-action states
 * @param {Object} childIndexMap - a map with (type-specific) indexes to validate index-sensitive pseudos
 * NOTE: This is held simple for readability purpose, you may easily add other pseudos
 */
export default function evalPseudoClass(pseudo, props, keyState, childIndexMap) {
	let userAction = evalUserAction(pseudo, keyState);
	let indexSensitive = childIndexMap ? evalChildIndex(pseudo, childIndexMap.index, childIndexMap.length) : false;
	let typeSensitive = childIndexMap ? evalChildIndex(pseudo, childIndexMap.typeIndex, childIndexMap.typeIndexLength, true) : false;
	let input = evalInput(pseudo, props);
	let other = evalOther(pseudo, props);

	let matched = userAction || indexSensitive || typeSensitive ||  input || other;
	return matched;
}

function evalUserAction(pseudo, keyState) {
	if (keyState) {
		if (validateSelector(pseudo, ':active')) {
			return keyState.get('active');
		} else if (validateSelector(pseudo, ':hover')) {
			return keyState.get('hover');
		} else if (validateSelector(pseudo, ':focus')) {
			return keyState.get('focus');
		}
	}
}

const indexPseudos = {
	indexSensitive: [':first-child', ':last-child', ':only-child', ':nth-child', 'nth-last-child'],
	typeSensitive: [':first-of-type', ':last-of-type', ':only-of-type', ':nth-of-type', ':nth-last-of-type']
}

function evalChildIndex(pseudo, index, length, typeSensitive) {
	let pseudos = indexPseudos[typeSensitive ? 'typeSensitive' : 'indexSensitive'];

	if (validateSelector(pseudo, pseudos[0])) {
		return index === 1;
	} else if (validateSelector(pseudo, pseudos[1])) {
		return index === length;
	} else if (validateSelector(pseudo, pseudos[2])) {
		return length === 1;
	} else if (validateSelector(pseudo, pseudos[3])) {
		let expr = splitNthExpression(pseudo, pseudos[3]);
		return evalNth(expr, index);
	} else if (validateSelector(pseudo, pseudos[4])) {
		let expr = splitNthExpression(pseudo, pseudos[4]);
		return evalNth(expr, length - index, true);
	}
}

function evalInput(pseudo, props, changeState) {
	if (validateSelector(pseudo, ':checked')) {
		return props.checked;
	} else if (validateSelector(pseudo, ':disabled')) {
		return props.disabled;
	} else if (validateSelector(pseudo, ':enabled')) {
		return !props.disabled;
	} else if (validateSelector(pseudo, ':required')) {
		return props.required;
	} else if (validateSelector(pseudo, ':optional')) {
		return !props.required;
	} else if (validateSelector(pseudo, ':read-only')) {
		return props.readOnly;
	} else if (validateSelector(pseudo, ':read-write')) {
		return !props.readOnly;
	} else if (validateSelector(pseudo, ':indeterminate')) {
		return props.indeterminate;
	}
}

function evalOther(pseudo, props) {
	if (validateSelector(pseudo, ':lang')) {
		return pseudo.indexOf(props.lang) > -1;
	} else if (validateSelector(pseudo, ':empty')) {
		return (!props.children || props.children.length < 1);
	} else if (validateSelector(pseudo, ':before') ||  validateSelector(pseudo, ':after')) {
		return true;
	}
}

/**
 * Evaluates nth expressions by parsing them
 * This is quite dirty and needs to be refactored later though it works fine
 * @param {string} expression - mathematical expression in the form an+b
 * @param {number} index - current elements index
 * @param {Boolean} reverse - if your validating a nth-last one
 */
function evalNth(expression, index, reverse) {
	//TODO: drunk => dirty, fix later
	if (expression === 'odd') {
		return index % 2 !== 0;
	} else if (expression === 'even') {
		return index % 2 === 0;
	} else {
		if (expression.indexOf('n') > -1) {
			let termSplit = expression.split('n');
			let mult = termSplit[0];
			mult = (mult === '-' ? '-1' : mult);

			let add = termSplit[1];
			add = (add ? add : '+0');
			add = parseInt(add);
			mult = parseInt(mult);

			if (isNaN(mult)) {
				return index >= add;
			} else {
				if (mult < 0 && index > add) {
					return false;
				} else if (mult > 0 && index < add) {
					return false;
				}
				return ((index - add) / mult) % 1 === 0;
			}
		} else {
			return index === parseInt(expression);
		}
	}
}

/**
 * Extracts only the mathematical expression out an pseudo-class string 
 * @param {string} pseudo - pseudo-class selector that includes a mathmactical expression
 * @param {string} expression - defines which index-sensitive pseudo-class your pseudo is, e.g: nth-child, first-of-type 
 */
function splitNthExpression(pseudo, expression) {
	let split = pseudo.replace(/ /g, '').split(expression + '(');
	return split[1].substr(0, split[1].length - 1);
}