/**
* Processes styles using a predefined set of processors
* @param {Object} styles - any style object that gets processed
* @param {Object} processArgs - a map of arguments that might be passed to the processor
*/
export default (styles, processors, processArgs) => {
  processors.forEach(processor => {
    styles = processor.process(styles, processArgs)
  })

  return styles
}
