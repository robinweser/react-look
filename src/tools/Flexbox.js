/*
	All flexbox property alternatives sort by specification
*/
var flexboxValues = {
	//Android < 4.4
	2009: {
		'flexDirection': '-webkit-box-direction',
		'alignItems': '-webkit-box-align',
		'flexWrap': '-webkit-box-lines',
		'justifyContent': '-webkit-box-pack',
		'flex': '-webkit-box-flex',
		'order': '-webkit-box-ordinal-group',
	},
	//IE 10
	2012: {
		'justifyContent': '-ms-flex-pack',
		'alignItems': '-ms-flex-align',
		'alignContent': '-ms-flex-line-pack',
		'order': '-ms-flex-order',
		'alignSelf': '-ms-flex-item-align',
		'flexGrow': '-ms-flex-positive',
		'flexShrink': '-ms-flex-negative',
		'flexBasis': '-ms-preferred-size'
	}
};

var Flexbox = {
	/*
		Validates if a property is part of the flexbox property set
	*/
	isFlexboxProperty: function(property, spec) {
		return spec && flexboxValues[spec].hasOwnProperty(property);
	},

	/*
		Identifies which flexbox specification is supported by the used browser
	*/
	getFlexboxSpecification: function(userAgent) {
		var android = userAgent.match(/Android\s+([\d\.]+)/);
		var msie = userAgent.match(/MSIE\s+([\d\.]+)/);
		var spec;
		//Set specification for Android < 4.4
		if (android) {
			var androidVersion = parseFloat(android[1]);
			if (androidVersion <= 4.4) {
				spec = 2009;
			}
		}
		//Set specification for IE 10
		if (msie) {
			var msieVersion = parseInt(msie[1]);
			if (msieVersion == 10) {
				spec = 2012;
			}
		}
		return spec;
	},

	/*
		Returns an array of alternative flexbox properties which need to be added in order to work properly
	*/
	getFlexboxPropertyBySpec: function(property, value, spec) {
		var specProperty = {};
		spec && (specProperty.property = flexboxValues[spec][property]);
		//alternative properties for IE 10 are quite simple and just differ in some values
		if (spec == 2012) {
			if (isNaN(value)) {
				specProperty.value = value.replace('flex-', '').replace('space-around', 'distribute').replace('space-between', 'justify');
			} else {
				specProperty.value = value;
			}

			//Android < 4.4 is quite a bunch of replacements
		} else if (spec == 2009) {
			if (property == 'flexDirection') {
				specProperty.value = (value.indexOf('reverse') > -1 ? 'reverse' : 'normal');
				specProperty = [specProperty, {
					property: '-webkit-box-orient',
					value: (value.indexOf('column') > -1 ? 'vertical' : 'horizontal')
				}];
			} else if (property == "flexWrap" && (value == 'wrap' || value == 'wrap-reverse')) {
				specProperty.value = 'multiple';
			} else if (property == 'justifyContent') {
				specProperty.value = (value.indexOf('space') > -1 ? 'justify' : value.replace('flex-', ''));
			} else if (property == 'order') {
				specProperty.value = value + 1;
			} else if (property == 'flex') {
				specProperty.value = value.split(' ')[0];
			}
		}
		return (specProperty instanceof Array) ? specProperty : [specProperty];
	}
}
module.exports = Flexbox;