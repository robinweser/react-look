import {getProcessors} from './api/Config'

export default function processStyles(styles, processArgs){
	let processors = getProcessors()
	processors = []
	processors.forEach(processor => {
		
		//Gathering additional needed arguments
		let args = []
		if (processor.args){
			processor.args.forEach(argument => {
				if (processArgs.hasOwnProperty(argument)){
					args.push(processArgs[argument])
				}
			})
		}
		
		styles = processor.process(styles, ...args)
	})
	
	return styles
}
