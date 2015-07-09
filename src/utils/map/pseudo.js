export default function pseudoMap(el, indexSensitive) {
	let pseudoMap = new Map();
	pseudoMap.set('empty', (el.props.children));
	
	//TODO: All index sensitive pseudos here
	if (indexSensitive){
		
	}
	return pseudoMap;
}