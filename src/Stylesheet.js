var HoverStyleMixin = require('./mixins/Hover.js');
var MediaQueryMixin = require('./mixins/MediaQuery.js');


var Stylesheet = {

   /*
      All style properties that need vendor prefixes
      Sort by prefix value
   */
    prefixProperties: {
        'webkit': ['appearance', 'userSelect', 'alignContent', 'alignItems', 'alignSelf', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexFlow', 'flexShrink', 'flexWrap', 'justifyContent', 'order', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'perspective', 'perspectiveOrigin', 'transform', 'transformOrigin', 'transformStyle', 'animation', 'animationDelay', 'animationDirection', 'animationFillMode', 'animationDuration', 'anmationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'calc'],
        'ms': ['userSelect', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexFlow', 'flexShrink', 'flexWrap', 'transform', 'transformOrigin', 'transformStyle'],
        'moz': ['appearance', 'userSelect', 'boxSizing'],
        'o': []
    },

    /*
      Capitalizes the first char of a property string to add a vendor prefix
   */
    caplitalizeString: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    /*
      Parse the navigator.userAgent to get the used browser or rather the needed vendor prefix
   */
    getVendorPrefix: function() {
        var vendorPrefixes = {
            firefox: 'Moz',
            chrome: 'Webkit',
            safari: 'Webkit',
            opera: 'O',
            msie: 'ms'
        };
        var userAgent = navigator.userAgent.toLowerCase();
        var browserMatch = userAgent.match('opera') || userAgent.match('msie') || userAgent.match('firefox') || userAgent.match("safari|chrome");

        return vendorPrefixes[browserMatch[0]];
    },

    /*
      Returns a prefixed style property
    */
    getVendorStyle: function(vendor, style, equivalent) {
        return vendor + this.caplitalizeString(style);
    },

    /*
      generates a new styles object with added prefixes, resolved media queries and hover styles
   */
    generateStyles: function(styles, options) {
        var vendor = this.getVendorPrefix();
        var opts = this.prefixProperties[vendor.toLowerCase()];

        var style;
        for (style in styles) {
            if (style.indexOf('@media') > -1 && !options.ignoreMediaQueries) {
                var query = this.parseMediaQuery(style);
                if (eval(query)) {
                    styles = this.applyAlternativeStyle(styles, style, vendor, opts);
                }
            } else if (style.indexOf(':hover') > -1 && options.hover) {
                styles = this.applyAlternativeStyle(styles, style, vendor, opts);
            } else {
                if (opts.indexOf(style) > -1) {
                    styles[this.getVendorStyle(vendor, style)] = styles[style];
                }
            }
        }
        return styles;
    },

    /*
     Returns a prefixed style property
  */
    applyAlternativeStyle: function(styles, style, vendor, opts)  {
        for (alternativeStyle in styles[style]) {
            if (opts.indexOf(alternativeStyle) > -1) {
                styles[this.getVendorStyle(vendor, alternativeStyle)] = styles[style][alternativeStyle];
            }
            styles[alternativeStyle] = styles[style][alternativeStyle];
        }
        return styles;
    },

    /*
     Main function to create a new stylesheet
     This returns a totally generated style object with prefixes, media queries and browser state
  */
    create: function(styles, options) {
        var stylesheet = JSON.parse(JSON.stringify(styles));

        var defaultOpts = {
            'width': window.innerWidth,
            'height': window.innerHeight,
            'deviceHeight': window.outerHeight,
            'deviceWidth': window.outerWidth,
            'hover': false,
        }
        options = (options ? options : {});

        if (!options.ignoreMediaQueries) {
            var opt;
            for (opt in defaultOpts) {
                if (!options[opt]) {
                    options[opt] = defaultOpts[opt];
                }
            };
        }
        var i;
        for (i in stylesheet) {
            stylesheet[i] = this.generateStyles(stylesheet[i], options);
        }

        return stylesheet;
    },

    /*
     Parses media queries so that the stylesheet generator is able to handle them
  */
    parseMediaQuery: function(query) {
        query = query.replace(/ /g, '').replace(/@media/g, '').replace(/and/g, '&&').replace(/or/g, '||').replace(/width/g, 'options.width').replace(/height/g, 'options.height').replace(/deviceHeight/g, 'options.deviceHeight').replace(/deviceWidth/g, 'options.deviceWidth');

        return this.validateMediaQuery(query);
    },

    /*
     Validates a media query syntax
     This secures the eval() function to not allow javascript functions
  */
  //TODO: write an own parser which evaluates the queries so that eval() may be dropped -> better performance, no security issues
    validateMediaQuery: function(query) {
        var mediaRegex = /\((options.width|options.height||options.deviceHeight||options.deviceWidth)(>=|<=|>|<|=)([0-9]+)\)(&&|\|\|)*/g;
        var matches = query.match(mediaRegex);

        var safeQuery = '';
        if (matches) {
            matches.forEach(function(item) {
                safeQuery += item;
            });
        }
        return safeQuery;
    }
};


module.exports = {
    Stylesheet: Stylesheet,
    Mixins: {
        HoverStyleMixin: HoverStyleMixin,
        MediaQueryMixin: MediaQueryMixin
    }
};
