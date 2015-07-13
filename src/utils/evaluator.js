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
	else if (Validator.isExpression(expr)) {
		let [
			property, value
		] = expr.split('=');
		if (state[property] == value) {
			return true;
		}
	}

	//eval pseudos 
	else if (Validator.isPseudo(expr)) {
		if (Validator.isPseudoLang(expr) && state.lang) {
			return expr.includes(lang);
		} else if (Validator.isPseudoHover(expr)) {
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
	}
	return false;
}

function evaluateIndexSensitive(expr, pseudoMap) {

}