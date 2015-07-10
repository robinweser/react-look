import * as Misc from './utils/misc';
import Enhancer from './utils/enhancer';

import Look from './class/Look';
import Global from './class/Global';

import assign from 'object-assign';

const defaultOpts = {
	autoProcess: true,
	unit: 'px'
};

let stylesheet;

let opts = defaultOpts;
let procs = new Set();
let themes = new Map();
let Theme;

export default {
	create(styles, options) {
			if (options) {
				this.setOptions(options);
			}
			stylesheet = new Look(styles, opts);

			return stylesheet;
		},

		createGlobal(styles, process) {
			return new Globa(styles, process);
		},

		setOptions(options) {
			opts = assign(opts, options);
		},

		getOptions() {
			return opts;
		},

		registerProcessor(processor) {
			processor = Misc.toArray(processor);

			processor.forEach(item => {
				procs.add(item);
			})
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

		Theme: Theme,

		enhance(component, resizeListener) {
			if (stylesheet) {
				return Enhancer.apply(component, stylesheet, resizeListener)
			} else {
				console.warn('You have not specified any stylesheet.');
				return component;
			}
		}

}