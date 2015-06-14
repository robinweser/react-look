var consolePrefix = "[Obscene-Stylesheet]: ";
var start, end;
var DebugHelper = {
	/*
		Start the timer to calculate the compile speed
	*/
	start: function() {
		start = Date.now();
	},

	/*
		Stops the timer
	*/
	stop: function() {
		end = Date.now();
		if (start)  {
			this.elapsedTimeInformation();
		} else {
			console.info(consolePrefix + "Timer already stopped.");
		}
	},

	/* 
		Shows the supported flexbox specification
	*/
	flexboxInformation: function(spec) {
		(spec == 2009) && (spec = spec + ' (Android < 4.4)');
		(spec == 2012) && (spec = spec + ' (IE 10)');
		console.info(consolePrefix + "Supported flexbox specification: " + (spec ? spec : 'up-to-date'));
	},
	/*
		Throws a warning that nested selectors are not supported and references the concerned key
	*/
	nestedSelectorWarning: function(selector) {
		console.warn(consolePrefix + "Nesting classes are no more supported and skipped. [key=" + selector + "]")
	},

	/*
		Shows the output and its size
	*/
	outputInformation: function(output) {
		var m = encodeURIComponent(output).match(/%[89ABab]/g);
		var size = output.length + (m ? m.length : 0);

		console.info(consolePrefix + "Generated CSS size: " + (size / 1000) + "kb");
		console.log(consolePrefix + "Generated CSS is now stored within Stylesheet.ouput");
		console.log(output);
	},

	/*
		Show all selectors and their count
	*/
	selectorInformation: function(styles) {
		var count = 0;
		if (Object.keys) {
			count = Object.keys(styles).length;
		} else {
			for (style in styles) {
				++count;
			}
		};
		console.log(consolePrefix + "Generated " + count + " selectors:");
		console.log(styles);
	},

	/*
		Shows the elapsed time needed to compile the stylesheet
	*/
	elapsedTimeInformation: function() {
		console.info(consolePrefix + "Stylesheet generated in " + (end - start) + "ms");
		start = undefined;
		end = undefined;
	},

	/*
		Informs that the stylesheet successfully has been applied to your document
	*/
	stylesheetApplied: function() {
		console.log(consolePrefix + "Stylesheet was applied to this pages <head>");
	},

	/*
		Warns that there is no stylesheet to apply
	*/
	notStylesheetWarning: function() {
		console.warn(consolePrefix + "No stylesheet to apply. Be sure to first create one with Stylesheet.create()");
	}
}

module.exports = DebugHelper;