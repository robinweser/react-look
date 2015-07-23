import {validateSelector, isNumber} from '../validator';
import {evalValue, evalRange, evalNth} from './eval.js';
import Regex from '../deprecated/regex.js';
import State from '../../map/state';


/**
 * Evaluates if a pseudo class fullfils its condition
 * @param {string} pseudo - pseudo-class that gets evaluated
 * @param {Object} container - React-Component that wraps these elements
 * @param {Object} element - current element that gets enhanced
 * @param {string} key - unique key each element using action pseudos (:active, :focus, :hover & :valid/:invalid) needs
 * @param {Object} childProps - a map with (type-specific) indexes to validate index-sensitive pseudos
 * NOTE: This is held simple for readability purpose, you may easily add other pseudos
 */
export default function evaluatePseudoClass(pseudo, container, element, key, childProps) {
	let keyState = State.get(container, key);
	let props = element.props;

	//user-action
	if (validateSelector(pseudo, ':active')) {
		return keyState.get('active');
	} else if (validateSelector(pseudo, ':hover')) {
		return keyState.get('hover');
	} else if (validateSelector(pseudo, ':focus')) {
		return keyState.get('focus');
	}

	//special user-action
	else if (validateSelector(pseudo, ':valid')) {
		return evalValue(keyState.get('change'), props.type);
	} else if (validateSelector(pseudo, ':invalid')) {
		return evalValue(keyState.get('change'), props.type);
	}

	//index-sensitive
	else if (validateSelector(pseudo, ':first-child')) {
		return childProps.index == 0;
	} else if (validateSelector(pseudo, ':last-child')) {
		return childProps.index == childProps.length - 1;
	} else if (validateSelector(pseudo, ':only-child')) {
		return childProps.length == 1;
	} else if (validateSelector(pseudo, ':nth-child')) {
		let expr = splitNthExpression(pseudo, ':nth-child');
		return evalNth(expr, childProps.index);
	} else if (validateSelector(pseudo, ':nth-last-child')) {
		let expr = splitNthExpression(pseudo, ':nth-last-child');
		return evalNth(expr, childProps.length - childProps.index, true);
	}

	//type-sensitive
	else if (validateSelector(pseudo, ':first-of-type')) {
		return childProps.typeIndex == 0;
	} else if (validateSelector(pseudo, ':last-of-type')) {
		return childprops.typeIndex == childProps.typeIndexLength - 1;
	} else if (validateSelector(pseudo, ':only-of-type')) {
		return childProps.typeIndexLength == 1;
	} else if (validateSelector(pseudo, ':nth-of-type')) {
		let expr = splitNthExpression(pseudo, ':nth-of-type');
		return evalNth(expr, childProps.typeIndex);
	} else if (validateSelector(pseudo, ':nth-last-of-type')) {
		let expr = splitNthExpression(pseudo, ':nth-last-of-type');
		return evalNth(expr, childProps.typeIndexLength - childProps.typeIndex, true);
	}

	//input
	else if (validateSelector(pseudo, ':checked')) {
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


	//other
	else if (validateSelector(pseudo, ':lang')) {
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