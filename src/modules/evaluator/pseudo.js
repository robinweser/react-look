let conditionMap = {
	//user-action
	':hover' : {keyState : 'hover', toBe: true},
	':active' : {keyState : 'active', toBe: true},
	':focus' : {keyState : 'focus', toBe: true},
	
	//input
	':checked' : {props : 'checked'},
	':disabled' : {props : 'disabled'},
	':enabled' : {props : 'disabled', negated: true},
	':required' : {props : 'required'},
	':optional' : {props : 'required', negated: true},
	':read-only' : {props : 'readOnly'},
	':read-write' : {props : 'readOnly', negated: true},
	':indeterminate' : {props: 'indeterminate'},
	
	//child-index
	':first-child' : {childIndexMap: 'index', toBe: 1},
	':last-child' : {childIndexMap: 'index', toBe: 'length'},
	':only-child' : {childIndexMap : 'length', toBe: 1},
	':nth-child' : {childIndexMap : 'index', nth: true},
	':nth-last-child' : {childIndexMap: 'index', nth: true, reverse: true},
	
	//type-index
	':first-of-type' : {childIndexMap: 'typeIndex', toBe: 1},
	':last-of-type' : {childIndexMap: 'typeIndex', toBe: 'typeLength'},
	':only-of-type' : {childIndexMap : 'length', toBe: 1},
	':nth-of-type' : {childIndexMap : 'typeIndex', nth: true},
	':nth-last-of-type' : {childIndexMap: 'typeIndex', nth: true, reverse: true},
	
	//other
	':lang' : {lang: true},
	':empty' : {children: true},
	':before' : {always: true},
	':after' : {always: true},
	'::before' : {always: true},
	'::after' : {always: true}
}

/**
 * Evaluates if a pseudo class fullfils its condition
 * @param {string} pseudo - pseudo-class that gets evaluated
 * @param {Object} props - elements props that get used to evaluate pseudos
 * @param {Map} keyState - stores information on elements current user-action states
 * @param {Object} childIndexMap - a map with (type-specific) indexes to validate index-sensitive pseudos
 * NOTE: This is held simple for readability purpose, you may easily add other pseudos
 */
export default function evalPseudoClass(pseudo, props, keyState, childIndexMap) {
	if (pseudo.indexOf('lang') > -1) {
		return pseudo.indexOf(props.lang) > -1;
	}

	let split = '';
	if (pseudo.indexOf('nth-') > -1) {
		split = splitNthExpression(pseudo);
		pseudo = split.pseudo;
	}

	//userAction
	if (conditionMap.hasOwnProperty(pseudo)) {
		let condition = conditionMap[pseudo];

		if (condition.hasOwnProperty('keyState')) {
			if (keyState) {
				return keyState.get(condition.keyState) === condition.toBe;
			} else {
				return false
			}
		}

		//input
		if (condition.hasOwnProperty('props')) {
			if (condition.hasOwnProperty('negated')) {
				return !props[condition.props];
			} else {
				return props[condition.props];
			}
		}

		//other
		if (condition.hasOwnProperty('lang')) {
			return pseudo.indexOf(props.lang) > -1;
		} else if (condition.hasOwnProperty('children')) {
			return !props.children ||  props.children.length < 1;
		} else if (condition.hasOwnProperty('always')) {
			return true;
		}

		//child-index
		if (condition.hasOwnProperty('childIndexMap')) {
			let length = condition.childIndexMap.indexOf('type') === 0 ? 'typeLength' : 'length';
			if (condition.hasOwnProperty('nth')) {
				if (condition.reverse) {
					return evalNth(split.expression, childIndexMap[length] - childIndexMap[condition.childIndexMap], true);
				} else {
					return evalNth(split.expression, childIndexMap[condition.childIndexMap]);
				}
			} else {
				if (condition.toBe === length) {
					return childIndexMap[condition.childIndexMap] === childIndexMap[length];
				} else {
					return childIndexMap[condition.childIndexMap] === condition.toBe;
				}
			}
		}
	} else {
		console.warn('Failed evaluating pseudo class: ' + pseudo + '. Invalid pseudo class.');
		console.warn('Be sure to only use supported pseudo classes.');
		return false;
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
function splitNthExpression(pseudo) {
	let split = pseudo.replace(/ /g, '').split('(');
	return {
		expression: split[1].substr(0, split[1].length - 1),
		pseudo: split[0]
	}
}