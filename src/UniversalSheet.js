import {
	Sheet
}
from 'dynamic-style-sheets';

import * as Util from './Util';
import Stylesheet from './Stylesheet';

export default class UniversalSheet extends Sheet {
	constructor(styles, options) {
		let state;
		if (styles.hasOwnProperty('_state')) {
			state = styles['_state'];
			delete styles['_state'];
		}

		let selectors = {};
		let media = {};

		Util.clearReference();
		let reference = Util.generateSelectors(styles, selectors, media, options);

		super(selectors);

		if (media) {
			this.media = {};
			let query;
			let i = 0;
			for (query in media) {
				this.media[query] = new Sheet(media[query], query, this.id + '-media-' + ++i);
			}
		}
		this.ref = reference;
		this.state = state;
	}

	process(processors, register, ...args) {
		let state = this.state;
		let media = this.media;

		if (processors)  {
			processors = Util.toArray(processors);
			if (register) {
				processors.forEach(function (item) {
					Stylesheet.registerProcessor(item);
				});
			}
		} else {
			processors = Stylesheet.getProcessors();
		}

		let i;
		let length = processors.length;
		for (i = 0; i < length; ++i) {
			super.process(processors[i], ...args);
			processors[i].process(state, ...args);

			let query;
			for (query in media) {
				media[query].process(processors[i], ...args);
			}
		}
	}

	apply() {
		let media = this.media;

		super.apply();

		let query;
		for (query in media) {
			media[query].apply();
		}
	}
}