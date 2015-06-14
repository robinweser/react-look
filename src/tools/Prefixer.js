var vendorPrefixes = {
	firefox: 'moz',
	chrome: 'webkit',
	safari: 'webkit',
	opera: 'o',
	msie: 'ms'
};

/*
	All style properties that need vendor prefixes sort by prefix
*/
var prefixProperties = {
	'webkit': ['appearance', 'userSelect', 'alignContent', 'alignItems', 'alignSelf', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexFlow', 'flexShrink', 'flexWrap', 'justifyContent', 'order', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'perspective', 'perspectiveOrigin', 'transform', 'transformOrigin', 'transformStyle', 'animation', 'animationDelay', 'animationDirection', 'animationFillMode', 'animationDuration', 'anmationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'calc'],
	'ms': ['userSelect', 'flex', 'flexDirection', 'flexFlow', 'flexPositive', 'flexNegative', 'flexWrap', 'transform', 'transformOrigin', 'transformStyle'],
	'moz': ['appearance', 'userSelect', 'boxSizing'],
	'o': []
};

var Prefixer = {
	/*
		Parse the navigator.userAgent to get the used browser or rather the needed vendor prefix
	*/
	getVendorPrefix: function(userAgent) {
		userAgent = userAgent.toLowerCase();
		var browserMatch = userAgent.match('opera') || userAgent.match('msie') || userAgent.match('firefox') || userAgent.match("safari|chrome");

		return vendorPrefixes[browserMatch[0]];
	},

	/*
	Returns a prefixed style property
	*/
	getPrefixedProperty: function(style, prefix) {
		return prefix + '-' + style;
	},

	isPrefixProperty: function(style, prefix) {
		return prefixProperties[prefix].indexOf(style) > -1;
	}

}

module.exports = Prefixer;