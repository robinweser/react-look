import * as Util from './Util';
import UniversalSheet from './UniversalSheet';
import objectAssign from 'object-assign';

const defaultOpts = {
	minify: true,
	unit: 'px',
	id: undefined,
	autoApply: false,
	autoProcess : false
};
let opts = defaultOpts;
let procs = new Set();

export default {
	create(styles, options = defaultOpts) {
			if (options) {
				this.setOptions(options);
			}
			return new UniversalSheet(styles, opts);
		},

		setOptions(options) {
			opts = objectAssign({}, opts, options);
		},

		getOptions() {
			return opts;
		},

		registerProcessor(processor) {
			procs.add(processor);
		},

		deregisterProcessor(processor) {
			procs.remove(processor);
		},
		
		getProcessors(){
			return procs;
		},

		/**
		 *	Merges an array of className strings into one string for html use
		 * @param {Array} classNames - an array of classNames that should be merged
		 */
		mergeClassNames(classNames) {
			if (classNames instanceof Array) {
				classNames = classNames.join(' ');
			}
			return classNames;
		}
}