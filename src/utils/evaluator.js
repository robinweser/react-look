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
			} else if (Validator.isPseudoReadWrite(expr)) {
				return (!el.props.hasOwnProperty('readonly') || el.props.readonly == false)
			} else if (Validator.isPseudoIndeterminate(expr)) {
				return (el.props.hasOwnProperty('indeterminate') && el.props.indeterminate == true)
			} else if (Validator.isPseudoValid(expr)) {
				return validateValue(StateMap.get(wrapper, key).get('changed'), el.props.type);
			} else if (Validator.isPseudoInvalid(expr)) {
				return !validateValue(StateMap.get(wrapper, key).get('changed'), el.props.type);
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

function validateValue(value, type) {
	if (type == 'email') {
		return validateEmail(value);
	} else if (type == 'url') {
		return validateUrl(value);
	} else if (type == 'number' || type == 'range') {
		return validateNumber(value);
	} else if (type == 'tel') {
		//TODO: tel validation
		return false;
	} else {
		return false;
	}
}

function validateEmail(email) {
	const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEx.test(email);
}

function validateUrl(url) {
	var regEx = new RegExp(
		"^" +
		// protocol identifier
		"(?:(?:https?|ftp)://)" +
		// user:pass authentication
		"(?:\\S+(?::\\S*)?@)?" +
		"(?:" +
		// IP address exclusion
		// private & local networks
		"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
		"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
		"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
		// IP address dotted notation octets
		// excludes loopback network 0.0.0.0
		// excludes reserved space >= 224.0.0.0
		// excludes network & broacast addresses
		// (first & last IP address of each class)
		"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
		"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
		"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
		"|" +
		// host name
		"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
		// domain name
		"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
		// TLD identifier
		"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
		// TLD may end with dot
		".?" +
		")" +
		// port number
		"(?::\\d{2,5})?" +
		// resource path
		"(?:[/?#]\\S*)?" +
		"$", "i"
	);
	return regEx.test(url);
}

function validateNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
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