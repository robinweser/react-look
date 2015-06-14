var consolePrefix = "[Obscene-Stylesheet]: ";
var start, end;
var DebugHelper = {
	start: function() {
		start = Date.now();
	},
	stop: function() {
		end = Date.now();
		if (start)  {
			this.elapsedTimeInformation();
		} else {
			console.info(consolePrefix + "Timer already stopped.");
		}
	},
	nestedSelectorWarning: function(selector) {
		console.warn(consolePrefix + "Nesting classes are no more supported and skipped. [key=" + selector + "]")
	},
	outputStored: function(output) {
		console.log(consolePrefix + "Generated CSS is now stored within Stylesheet.ouput:");
		console.log(output);
	},
	selectorInformation: function(styles) {
		var count = 0;
		if (Object.keys) {
			count = Object.keys(styles).length;
		} else {
			for (style in styles) {
				++count;
			}
		};
		console.info(consolePrefix + "Generated " + count + " selectors:");
		console.log(styles);
	},
	elapsedTimeInformation: function() {
		console.info(consolePrefix + "Stylesheet generated in " + (end - start) + "ms");
		start = undefined;
		end = undefined;
	},
	stylesheetApplied: function() {
		console.log(consolePrefix + "Stylesheet was applied to this pages <head>");
	},
	notStylesheetWarning: function() {
		console.warn(consolePrefix + "No stylesheet to apply. Be sure to first create one with Stylesheet.create()");
	}
}

module.exports = DebugHelper;