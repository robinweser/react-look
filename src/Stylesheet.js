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
      Adds additional prefixProperties if needed
   */
   addPrefixProperty: function(prefix, property) {
      if (!this.prefixProperties[prefix][property]) {
         this.prefixProperties[prefix].push(property)
      }
   },

   /*
      Parse the navigator.userAgent to get the used browser or rather the needed vendor prefix
   */
   getVendorPrefix: function(userAgent) {
      var vendorPrefixes = {
         firefox: 'Moz',
         chrome: 'Webkit',
         safari: 'Webkit',
         opera: 'O',
         msie: 'ms'
      };
      if (!userAgent) {
         userAgent = navigator.userAgent.toLowerCase();
      }
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
      var requiredPrefixProperties = this.prefixProperties[options.vendor.toLowerCase()];

      var style;
      for (style in styles) {
         if (style instanceof Object) {
            //if a property is a object with inner styles this calls generateStyles for the innerStyle, this allows nested styles
            styles[style] = this.generateStyles(styles[style], options);
         } else {
            //adds additional vendor prefxied properties
            if (requiredPrefixProperties.indexOf(style) > -1) {
               styles[this.getVendorStyle(vendor, style)] = styles[style];
            }
         }
      }
      return styles;
   },

   /*
     Main function to create a new stylesheet
     This returns a totally generated style object with prefixes, media queries and browser state
  */
   create: function(styles, options) {
      options = (options ? options : {});

      options.vendor = this.getVendorPrefix(options.userAgent);
      
      return this.generateStyles(styles, options);
   }
};


module.exports = Stylesheet;