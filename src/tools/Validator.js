var Validator = {
	/* 
		Checks if the selector is a media query
	*/
	isMediaQuery: function(selector) {
		return selector.trim().charAt(0) == '@';
	},

	/* 
		Checks if the selector is a extend object
	*/
	isExtend: function(selector) {
		return selector.trim().charAt(0) == '+';
	},

	/* 
		Checks if the selector is a pseudo class
	*/
	isPseudoClass: function(selector) {
		return selector.trim().charAt(0) == ':';
	},

	/* 
		Checks if the selector is a class
	*/
	isClass: function(selector) {
		return !this.isPseudoClass(selector) && !this.isExtend(selector) && !this.isMediaQuery(selector);
	}
}

module.exports = Validator;