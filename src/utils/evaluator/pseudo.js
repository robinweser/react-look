import {validateSelector, isNumber} from '../validator';
import {evalValue, evalRange, evalNth} from './eval.js';
import Regex from '../deprecated/regex.js';


/**
 * Evaluates if a pseudo class fullfils its condition
 * @param {string} pseudo - pseudo-class that gets evaluated
 * @param {Object} props - elements props that get used to evaluate pseudos
 * @param {Map} keyState - stores information on elements current user-action states
 * @param {Object} childProps - a map with (type-specific) indexes to validate index-sensitive pseudos
 * NOTE: This is held simple for readability purpose, you may easily add other pseudos
 */
export default function evaluatePseudoClass(pseudo, props, keyState, childProps) {
	let userAction = evalUserAction(pseudo, keyState, props.type);
	let indexSensitive = evalChildIndex(pseudo, childProps.index, childProps.length);
	let typeSensitive = evalChildIndex(pseudo, childProps.typeIndex, childProps.typeIndexLength, true);
	let input = evalInput(pseudo, props);
	let other = evalOther(pseudo, props);
	
	let matched = userAction || indexSensitive || typeSensitive || input || other;
	return matched ? true : false;
}

function evalUserAction(pseudo, keyState, type) {
	if (validateSelector(pseudo, ':active')) {
		return keyState.get('active');
	} else if (validateSelector(pseudo, ':hover')) {
		return keyState.get('hover');
	} else if (validateSelector(pseudo, ':focus')) {
		return keyState.get('focus');
	}
	//special user-action
	else if (validateSelector(pseudo, ':valid')) {
		return evalValue(keyState.get('change'), type);
	} else if (validateSelector(pseudo, ':invalid')) {
		return evalValue(keyState.get('change'), type);
	}
}

const indexPseudos = {
	indexSensitive : [':first-child', 'last-child', ':only-child', ':nth-child', 'nth-last-child'],
	typeSensitive : [':first-of-type', ':last-of-type', ':only-of-type', ':nth-of-type', ':nth-last-of-type']
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

function evalInput(pseudo, props) {
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
	} else if (validateSelector(pseudo, ':in-range')) {
		return evalRange(props);
	} else if (validateSelector(pseudo, ':out-of-range')) {
		return !evalRange(props);
	} else if (validateSelector(pseudo, ':read-only')) {
		return props.readonly;
	} else if (validateSelector(pseudo, ':read-write')) {
		return !props.readonly;
	} else if (validateSelector(pseudo, ':indeterminate')) {
		return props.indeterminate;
	}
}

function evalOther(pseudo, props) {
	if (validateSelector(pseudo, ':lang')) {
		return pseudo.indexOf(props.lang) > -1;
	} else if (validateSelector(pseudo, ':empty')) {
		return (!props.children || props.children.length < 1);
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