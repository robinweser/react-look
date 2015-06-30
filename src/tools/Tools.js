import DebugHelper from './devTools/DebugHelper';
import Validator from './devTools/Validator';

import Flexbox from './processors/Flexbox';
import Prefixer from './processors/Prefixer';


export let DevTools = {
	DebugHelper: DebugHelper,
	Validator: Validator
}

export let Processors = {
	Flexbox: Flexbox,
	Prefixer: Prefixer
}

export default {
	DevTools: DevTools,
	Processors: Processors
}