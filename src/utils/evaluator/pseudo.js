import {validateSelector, isNumber} from './validator';
import {evalValue, evalRange, evalNth} from './eval.js';
import Regex from '../deprecated/regex.js';
import State from '../../map/state';


/**
 * Pseudo-class groups that include associated pseudos
 */
const pseudoGrouping = {
	userAction: [':action', ':focus', ':hover'],
	indexSensitive: [':first-child', ':last-child', ':only-child', ':nth-child', ':nth-last-child'],
	typeSensitive: [':first-of-type', ':last-of-type', ':only-of-type', ':nth-of-type', ':nth-last-of-type'],
	input: [':checked', ':disabled', ':enabled', ':required', ':optional', ':in-range', ':out-of-range', ':read-only', ':read-write', 'indeterminate'],
	inputValidation: [':valid', ':invalid'],
	other: [':lang', ':empty'],
}

/**
 * Evaluates if a pseudo class fullfils its condition
 * @param {string} pseudo - pseudo-class that gets evaluated
 * @param {Object} container - React-Component that wraps these elements
 * @param {Object} element - current element that gets enhanced
 * @param {string} key - unique key each element using action pseudos (:active, :focus, :hover & :valid/:invalid) needs
 * @param {Object} childProps - a map with (type-specific) indexes to validate index-sensitive pseudos
 */
export default function evaluatePseudoClass(pseudo, container, element, key, childProps) {
	let keyState = State.get(container, key);

	let evaluation = generateEvaluationMap(pseudo, keyState, element.props, childProps)

	/**
	 * Iterate all validation keys and check which pseudo pseudo matches
	 */
	let pseudoClass;
	for (pseudoClass in evaluation) {
		if (validateSelector(pseudo, pseudoClass)) {
			return evaluation[pseudoClass];
		}
	}
}

/**
 * Identifies selectors pseudo group
 * @param {string} selector - selector that gets checked
 */
function getPseudoGroup(selector) {
	let group;
	for (group in pseudoGrouping) {
		if (pseudoGrouping[group].indexOf(selector) > -1) {
			return group;
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


/**
 * Creates a map with evaluated pseudo classes for each pseudo group
 * @param {string} pseudo - current pseudo-class string
 * @param {string} keyState - action states for the current element
 * @param {Object} props - element properties
 * @param {Object} childProps - a map with (type-specific) indexes to validate index-sensitive pseudos
 */
function generateEvaluationMap(pseudo, keyState, props, childProps) {
	let pseudoGroup = getPseudoGroup(pseudo);
	let evalMap;

	if (pseudoGroup == 'userAction') {
		evalMap = {
			':hover': keyState.get('hover'),
			':focus': keyState.get('focus'),
			':active': keyState.get('active')
		}
	} else if (pseudoGroup == 'inputValidation') {
		evalMap = {
			':valid': evalValue(keyState.get('change'), props.type),
			':invalid': evalValue(keyState.get('change'), props.type)
		}
	} else if (pseudoGroup == 'input' && el.type == 'input' && props) {
		evalMap = {
			':checked': props.checked,
			':disabled': props.disabled,
			':enabled': !props.disabled,
			':required': props.required,
			':optional': !props.required,
			'in-range': evalRange(props),
			':out-of-range': !evalRange(props),
			':read-only': props.readonly,
			':read-write': !props.readonly,
			':indeterminate': props.indeterminate
		}
	} else if (pseudoGroup == 'indexSensitive') {
		evalMap = {
			':first-child': childProps.index == 0,
			':last-child': childProps.index == childProps.length - 1,
			':only-child': childProps.length == 1,
			'nth-child': evalNth(splitNth(pseudo, ':nth-child'), childProps.index),
			'nth-last-child': evalNth(splitNth(pseudo, ':nth-last-child'), childProps.length - childProps.index, true),
		}
	} else if (pseudoGroup == 'typeSensitive') {
		evalMap = {
			':first-of-type': childProps.typeIndex == 0,
			':last-of-type': childProps.typeIndex == childProps.typeIndexLength - 1,
			':only-of-type': childProps.typeIndexLength == 1,
			'nth-of-type': evalNth(splitNth(pseudo, ':nth-of-type'), childProps.typeIndex),
			'nth-last-of-type': evalNth(splitNth(pseudo, ':nth-last-of-type'), childProps.typeIndexLength - childProps.typeIndex, true),
		}
	} else if (pseudoGroup == 'other') {
		evalMap = {
			':lang': pseudo.includes(props.lang),
			':empty': (!props.children || props.children.length < 1)
		}
	}

	return evalMap;
}