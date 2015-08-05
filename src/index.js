import State from './map/state';
import * as matchMedia from './utils/matchMedia';
import Global from './class/Global';
import Look from './utils/enhancer';


function registerProcessor(processor) {
	//TODO: register/deregister Processors
}

function deregisterProcessor(processor) {
	//TODO: register/deregister Processors
}

function getProcessors(processor) {
	//TODO: register/deregister Processors
}

export {
	Look as default,
	Look as Look,
	Global as Global,
	State as State,
	matchMedia as matchMedia
}