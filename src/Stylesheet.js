var paramCase = require('param-case');
var objectAssign = require('object-assign');

//tools
var Prefixer = require('./tools/Prefixer');
var Validator = require('./tools/Validator');
var Flexbox = require('./tools/Flexbox');
var DebugHelper = require('./tools/DebugHelper');
var unitlessProperties = require('./tools/Unitless');

var counter, generatedStyles;

var Stylesheet = {
	output: undefined,
	debugMode: false,

	/*
     Main function to create a new stylesheet
     This returns a totally generated style object with prefixes, media queries and browser state
     See README.md file for further information on options
  */
	create: function(styles, options) {
		options = (options ? options : {});

		this.debugMode = (options.debugMode ? options.debugMode : false);
		this.debugMode && DebugHelper.start();

		options.minify = (options.minify != undefined ? options.minify : true);

		options.unit = (options.unit ? options.unit : 'px');
		options.userAgent = (options.userAgent ? options.userAgent : navigator.userAgent);
		options.vendorPrefix = (options.vendorPrefix ? options.vendorPrefix : Prefixer.getVendorPrefix(options.userAgent));
		options.autoApply = (options.autoApply ? options.autoApply : true);
		options.flexbox = Flexbox.getFlexboxSpecification(options.userAgent);

		counter = (options.counter ? options.counter : 0);
		
		generatedStyles = {};

		this.generateSelectors(styles, options);

		this.output = '';
		var selector;
		for (selector in generatedStyles) {
			this.output += selector + '{' + generatedStyles[selector] + '}';
		}

		if (this.debugMode) {
			DebugHelper.flexboxInformation(options.flexbox);
			DebugHelper.selectorInformation(generatedStyles);
			DebugHelper.outputInformation(this.output);
			!options.autoApply && this.stop();
		}
		options.autoApply && this.apply();

		return styles;
	},


	apply: function(CSS)  {
		CSS = (CSS ? CSS : this.output);

		if (!CSS) {
			this.debugMode && DebugHelper.noStylesheetWarning();
		} else {
			var style = document.createElement('style');
			style.type = "text/css";
			style.innerHTML = CSS;

			document.head.appendChild(style);
			this.debugMode && DebugHelper.stylesheetApplied();
		}
		this.debugMode && DebugHelper.stop()
		return CSS;
	},

	/*
		Generates an object with selectors as key and a CSS string as value for a given styles object
	*/
	generateSelectors: function(styles, options, parent) {
		options.selectorPrefix = (options.selectorPrefix ? options.selectorPrefix : '.');
		parent = (parent ? parent : '');

		var selector;
		for (selector in styles) {
			//resolve functions
			(styles[selector] instanceof Function) && (styles[selector] = styles[selector]());

			if (styles[selector] instanceof Object) {
				if (Validator.isClass(selector)) {
					if (parent) {
						this.debugMode && DebugHelper.nestedSelectorWarning(selector);
						continue;
					};
					this.handleClass(selector, parent, styles, options);
				} else {
					//check for extends
					if (Validator.isExtend(selector)) {
						styles = this.handleExtend(styles, selector, parent);
						this.generateSelectors(styles, options, parent);
						return;
					}
					//check for media queries
					if (Validator.isMediaQuery(selector)) {
						//TODO: handle media queries
					}
					//check for pseudo classes
					if (Validator.isPseudoClass(selector)) {
						generatedStyles[parent + selector] = '';
						this.generateSelectors(styles[selector], options, parent + selector);
					}
				}
			} else {
				this.handleProperty(selector, parent, styles[selector], options);
			}
		}
	},

	/*
		Generates a new class selector and calls for its properties
	*/
	handleClass: function(selector, className, styles, options) {
		className = this.generateClassName(selector, options.selectorPrefix, options.minify);
		generatedStyles[className] = '';
		this.generateSelectors(styles[selector], options, className);
		styles[selector] = className.slice(1);
		className = '';
	},

	handleExtend: function(base, selector, className) {
		var extension = base[selector];

		if (!extension.styles instanceof Array) {
			extension.styles = [extension.styles];
		}
		extension.styles.forEach(function(item) {
			if (extension.overwrite) {
				objectAssign(base, item);
			} else {
				objectAssign(item, base);
			}
		});
		delete base[selector];
		return base;
	},
	/*
		Validates properties for vendor prefixes and assigns to a given selector
	*/
	handleProperty: function(property, selector, value, options) {
		//Handle flexbox properties
		if (property == 'display' && value.indexOf('flex') > -1) {
			this.handleFlexboxDisplay(property, selector, value, options);
		}
		if (Flexbox.isFlexboxProperty(property, options.flexbox)) {
			this.handleFlexbox(selector, property, value, options.flexbox);
		}
		
		value = this.addUnits(property, value, options.unit);
		//adds additional vendor prefxied properties
		if (Prefixer.isPrefixProperty(property, options.vendorPrefix)) {
			this.addCSSProperty(selector, '-' + paramCase(Prefixer.getPrefixedProperty(property, options.vendorPrefix)), value);
		}
		this.addCSSProperty(selector, paramCase(property), value)
	},

	/* 
		Validates flexobx properties and adds additional specification properties if needed
	*/
	handleFlexbox: function(selector, property, value, spec) {
		var flexValue = Flexbox.getFlexboxPropertyBySpec(property, value, spec);
		flexValue.forEach(function(item) {
			Stylesheet.addCSSProperty(selector, item.property, item.value);
		});
	},

	/*
		Handles flexbox display issues with older specifications
	*/
	handleFlexboxDisplay: function(proprety, selector, value, options) {
		var flexValue = (value.indexOf('inline') > -1 ? 'inline-flex' : 'flex');
		if (options.flexbox == 2012) {
			this.addCSSProperty(selector, 'display', '-ms-' + flexValue + 'box');
		} else if (options.flexbox == 2009) {
			this.addCSSProperty(selector, 'display', '-webkit-box');
		} else {
			if (options.vendorPrefix == 'webkit') {
				this.addCSSProperty(selector, 'display', '-webkit-' + flexValue);
			}
		}
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
	generateClassName: function(selector, prefix, minify) {
		if (minify) {
			selector = 'c' + counter.toString(36);
			++counter;
		}
		selector = prefix + selector;
		return selector;
	},

	/* 
		Generates a html attribute valid className string for direct use
	*/
	mergeClassNames: function(classNames) {
		if (classNames instanceof Array) {
			classNames = classNames.join(' ');
		}
		return classNames;
	}
};


module.exports = Stylesheet;