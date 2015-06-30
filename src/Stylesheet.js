import paramCase from 'param-case';
import * as Util from './util/Util';
import DynamicStyleSheet from 'dynamic-style-sheets';

let themes = new Map();
let Theme, options;

const defaultOptions = {
	minify: true,
	autoApply: false,
	applyDirty: true,
	id: undefined,
	unit: 'px'
}


export class ObsceneStyleSheet extends DynamicStyleSheet {
	constructor(styles, opts) {
		if (!opts) {
			opts = (options ? options : defaultOptions);
		}
		let sheet = new Map();

		Util.clearReference();
		this.reference = Util.generateSelectors(styles, sheet, options);

		super(sheet, options.id);

		if (options.autoApply) {
			this.apply(options.applyDirty);
		}
	}

	clear() {
		this.removeAll();
	}
}

export function registerTheme(theme, variables) {
	themes.set(theme, variables);
};

export function applyTheme(theme) {
	Theme = themes.get(theme);
}

export function setOptions(opts = defaultOptions) {
	options = opts;
}

export Theme;