import DebugHelper from './devTools/DebugHelper';
import Validator from './devTools/Validator';

import Flexbox from './processors/Flexbox';
import Prefixer from './processors/Prefixer';


export DevTools = {
	DebugHelper: DebugHelper,
	Validator: Validator
}

export Processors = {
	Flexbox: Flexbox,
	Prefixer: Prefixer
}

export default {
	DevTools: DevTools,
	Processors: Processors
}