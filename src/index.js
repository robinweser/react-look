import * as Util from './Util';
import UniversalSheet from './sheets/UniversalSheet';
import InlineSheet from './sheets/InlineSheet';
import objectAssign from 'object-assign';

const defaultOpts = {
	minify: true,
	unit: 'px',
	id: undefined,
	autoApply: false,
	autoProcess: false
};
let opts = defaultOpts;
let procs = new Set();
let themes = new Map();
let Theme;

export default {
	create(styles, options = defaultOpts) {
			if (options) {
				this.setOptions(options);
			}
			return new UniversalSheet(styles, opts);
		},

		createInline(styles, autoProcess) {
			return new InlineSheet(styles, autoProcess);
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

		getProcessors() {
			return procs;
		},

		registerTheme(name, theme) {
			themes.set(name, theme);
			this.useTheme(name);
		},

		useTheme(name) {
			Theme = themes.get(name);
			this.Theme = Theme;
		},

		getThemes() {
			return themes;
		},

		Theme : Theme,


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