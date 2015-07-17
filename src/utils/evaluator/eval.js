/*
 * Evaluates nth expressions by parsing them
 * This is quite dirty and needs to be refactored later though it works fine
 */
export function evalNth(expression, index, reverse) {
	//TODO: drunk => dirty, fix later
	if (expression == 'odd') {
		return index % 2 != 0;
	} else if (value == 'even') {
		return index % 2 == 0;
	} else {
		if (expression.includes('n')) {
			let termSplit = expression.split('n');
			let mult = termSplit[0];
			mult = (mult == '-' ? '-1' : mult);

			let add = termSplit[1];
			add = (add ? add : '+0');
			add = parseInt(add);
			mult = parseInt(mult);
			if (!reverse) {
				++index;
			}
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

export function evalRange(props) {
	let {
		min, max, value
	} = props;
	return min != undefined && max != undefined && value >= min && value <= max;
}