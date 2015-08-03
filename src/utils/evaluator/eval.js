/**
 * Evaluates nth expressions by parsing them
 * This is quite dirty and needs to be refactored later though it works fine
 * @param {string} expression - mathematical expression in the form an+b
 * @param {number} index - current elements index
 * @param {Boolean} reverse - if your validating a nth-last one
 */
export function evalNth(expression, index, reverse) {
	//TODO: drunk => dirty, fix later
	if (expression == 'odd') {
		return index % 2 != 0;
	} else if (expression == 'even') {
		return index % 2 == 0;
	} else {
		if (expression.indexOf('n') > -1) {
			let termSplit = expression.split('n');
			let mult = termSplit[0];
			mult = (mult == '-' ? '-1' : mult);

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
				return ((index - add) / mult) % 1 == 0;
			}
		} else {
			return index == parseInt(value);
		}
	}
}

/**
 * Validates input values by their type
 * NOTE: Uses regexes which are deprecated and will be removed soon
 * @param {string} value - value that gets validated by type
 * @param {string} type - current elements type
 */
export function evalValue(value, type) {
	console.warn("Validation within react-look has been deprecated. Use react-look-tools instead.");

	if (type == 'email') {
		return Regex.email.test(value);
	} else if (type == 'url') {
		return Regex.url.test(value);
	} else if (type == 'number' || type == 'range') {
		return Validator.isNumber(value);
	} else if (type == 'tel') {
		//TODO: tel validation
		return false;
	} else {
		return false;
	}
}

/**
 * Validates if a value is in range of min, max or not
 * @param {Object} props - current elements props including min,max and value
 */
export function evalRange(props) {
	let {min, max, value} = props;
	return min != undefined && max != undefined && value >= min && value <= max;
}