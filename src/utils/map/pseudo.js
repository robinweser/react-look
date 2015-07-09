export default function pseudoMap(el, styles) {
	let pseudoMap = new Map();
	pseudoMap.set('empty', (el.props.children));

	//Determine if any child needs index sensitive pseudo class check
	let indexSensitive;
	el.props.children.forEach(item => {
		if (item.props.look) {
			if (styles.hasOwnProperty(item.props.look) && styles[item.props.look].indexSensitive) {
				indexSensitive = true;
			}
		}
	});

	pseudoMap.set('indexSensitive', indexSensitive);

	return pseudoMap;
}