/**
 * Extends the default process function by allowing multiple processors passed as an array
 * {Sheet|CSSSheet} super - parent sheet thats process()-method gets called
 * {Object|Array} processors - processors that get called to modify the styles
 * {any} ...args - any arguments you need to pass to your processor
 */
export default function multiProcess(super, processors, ...args) {
	if (processors instanceof Array === false) {
		super.process(processors, ...args);
	} else {
		processors.forEach(item => {
			super.process(item, ...args);
		})
	}
}