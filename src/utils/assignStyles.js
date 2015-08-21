import {_Object} from 'type-utils';
/**
 * Assigns two styles and optionally overwrites existing values
 * Built to assign inline-style objects and respects CSS's !important annotation
 * @param {Object} styles - style objects which get merged together
 * Note: The first style object will serve as base
 * Existing values will get overwritten by default
 */
export default function assignStyles(...styles) {
	let newStyles = styles.splice(1);
	let base = styles[0];
	let css = [];
	
	extractCSS(base, css);
	
	newStyles.forEach(styleObj => {
		if (styleObj) {
			extractCSS(styleObj, css);
			
			_Object.each(styleObj, (property, value) => {
				if (!(base.hasOwnProperty(property) && isImportant(base[property]))) {
					if (value instanceof Object) {
						assignStyles(base[property], value);
					} else {
						base[property] = value;
					}
				}
			})
		}
	});
	
	if (css.length > 0){
		base.css = css.join(' ');
	}
	
	return base;
}


/**
 * Extracts a CSS className to keep it while merging styles
 * @param {Object} obj - current style object that might have a css key
 * @param {Array} store - array that stores all classNames
 */
function extractCSS(obj, store){
	if (obj.hasOwnProperty('css')){
		store.push(obj.css);
		delete obj.css;
	}
}
/**
 * Checks if a property value is an css important rule with !important
 * @param {string} property - property thats value gets checked 
 */
function isImportant(value) {
	return typeof value == 'string' && value.toLowerCase().indexOf('!important') > -1;
}