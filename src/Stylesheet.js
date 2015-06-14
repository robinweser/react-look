var paramCase = require('param-case');

var generatedStyles;
var unitlessProperties = [
	'boxFlex', 'boxFlexGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexNegative', 'flexShrink', 'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'strokeDashoffest', 'strokeOpacity', 'strokeWidth'
];
var Stylesheet = {
	output: undefined,
	/*
     Main function to create a new stylesheet
     This returns a totally generated style object with prefixes, media queries and browser state
     Check the README for detailed information on the options
  */
	//userAgent, vendor, unit, debugMode, selectorPrefix, 
	create: function(styles, options) {
		options = (options ? options : {});

		options.unit = (options.unit ? options.unit : 'px');
		options.autoApply = (options.autoApply ? options.autoApply : true);

		generatedStyles = {};

		this.generateSelectors(styles, options);


		this.output = '';
		var selector;
		for (selector in generatedStyles) {
			this.output += selector + '{' + generatedStyles[selector] + '}';
		}

		options.autoApply && this.apply();

		return styles;
	},


	apply: function(CSS)  {
		CSS = (CSS ? CSS : this.output);

		if (!CSS) {
			console.warn("no style to apply")
		} else {
			var style = document.createElement('style');
			style.type = "text/css";
			style.innerHTML = CSS;

			document.head.appendChild(style);
		}

		return CSS;
	},

	/*
		Generates an object with selectors as key and a CSS string as value for a given styles object
	*/
	generateSelectors: function(styles, options, parent) {
		options.selectorPrefix = (options.selectorPrefix ? options.selectorPrefix.trim() + ' ' : '');
		parent = (parent ? parent : '');

		var selector;
		for (selector in styles) {
			if (styles[selector] instanceof Object) {
				this.handleClass(selector, parent, styles, options);
			} else {
				this.handleProperty(selector, parent, styles[selector], options);
			}
		}
	},

	/*
		Generates a new class selector and calls for its properties
	*/
	handleClass: function(selector, className, styles, options) {
		className = this.generateClassName(selector);
		generatedStyles[className] = '';
		this.generateSelectors(styles[selector], options, className);
		styles[selector] = className;
		className = '';
	},

	/*
		Validates properties for vendor prefixes and assigns to a given selector
	*/
	handleProperty: function(property, selector, style, options) {
		var value = this.addUnits(selector, style, options.unit);
		this.addCSSProperty(selector, paramCase(selector), value)
	},

	/*
		Adds a property to a given selector
	*/
	addCSSProperty: function(selector, property, value) {
		generatedStyles[selector] && (generatedStyles[selector] += ';')
		generatedStyles[selector] += property + ':' + value;
	},

	/*
	  checks if a value needs a unit
	*/
	addUnits: function(selector, value, unit) {
		if (!isNaN(value) && unitlessProperties.indexOf(selector) == -1) {
			value += unit;
		}
		return value;
	},

	/* 
	   Checks the selectors type and generates CSS valid selectors
	*/
	generateClassName: function(selector) {
		selector = '.' + selector;
		return selector;
	}
};


module.exports = Stylesheet;