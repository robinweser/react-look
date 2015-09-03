/**
* Processes styles using a predefined set of processors
* @param {Object} styles - any style object that gets processed
* @param {Object} processArgs - a map of arguments that might be passed to the processor
*/
export default function processStyles(styles, processors, processArgs){
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
