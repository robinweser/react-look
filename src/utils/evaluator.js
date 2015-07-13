import * as Validator from './validator';
import StateMap from '../map/state';

export default function evaluateExpression(expr, wrapper, el, key) {
	let state = wrapper.state;
	//eval media queries
	if (Validator.isMediaQuery(expr)) {
		if (window.matchMedia) {
			return window.matchMedia(expr.replace('@media', '').trim()).matches;
		} else {
			throw "Can not resolve media queries. Caused by evaluateExpression " + expr;
		}
	}

	//eval conditions
	else if (Validator.isCondition(expr)) {
		let [
			property, value
		] = expr.split('=');
		if (state[property] == value) {
			return true;
		}
	}

	//eval pseudos 
	else if (Validator.isPseudo(expr)) {
		//mouse pseudos
		if (Validator.isPseudoHover(expr)) {
			if (StateMap.get(wrapper, key).get('hovered') == true) {
				return true;
			}
		} else if (Validator.isPseudoFocus(expr)) {
			if (StateMap.get(wrapper, key).get('focused') == true) {
				return true;
			}
		} else if (Validator.isPseudoActive(expr)) {
			if (StateMap.get(wrapper, key).get('active') == true) {
				return true;
			}
		}

		if (el.type == 'input') {
			//Input Pseudos
			if (Validator.isPseudoChecked(expr)) {
				return (el.props.hasOwnProperty('checked') || el.props.checked == true);
			} else if (Validator.isPseudoDisabled(expr)) {
				return (el.props.hasOwnProperty('disabled') && el.props.disabled == true);
			} else if (Validator.isPseudoEnabled(expr)) {
				return (!el.props.hasOwnProperty('disabled') || el.props.disabled == false);
			} else if (Validator.isPseudoRequired(expr)) {
				return (el.props.hasOwnProperty('required') && el.props.required == false);
			} else if (Validator.isPseudoOptional(expr)) {
				return (!el.props.hasOwnProperty('required') || el.props.required == false);
			} else if (Validator.isPseudoInRange(expr)) {
				return (evaluateRange(el.props) == 'in' ? true : false);
			} else if (Validator.isPseudoOutOfRange(expr)) {
				return (evaluateRange(el.props) == 'out' ? true : false);
			} else if (Validator.isPseudoReadOnly(expr)) {
				return (el.props.hasOwnProperty('readonly') && el.props.readonly == true)
			} else if (Validator.isPseudoReadOnly(expr)) {
				return (!el.props.hasOwnProperty('readonly') || el.props.readonly == false)
			}
		}

		//other
		else if (Validator.isPseudoLang(expr) && state.lang) {
			return expr.includes(lang);
		}
	}
	return false;
}

function evaluateIndexSensitive(expr, pseudoMap) {

}

function evaluateRange(props) {
	let val = props.value;
	let min = props.min;
	let max = props.max;
	if (min != undefined && max != undefined) {
		if (val >= min && val <= max) {
			return 'in';
		} else {
			return 'out';
		}
	} else {
		return false;
	}
}