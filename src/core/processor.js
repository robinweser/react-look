/**
* Processes styles using a predefined set of processors
* @param {Object} styles - any style object that gets processed
* @param {Object} processArgs - a map of arguments that might be passed to the processor
*/
export default function processStyles( styles, processors, processArgs ) {
  let prcessedStyles = styles

  processors.forEach(processor => {
    prcessedStyles = processor.process(prcessedStyles, processArgs)
  })

  return prcessedStyles
}
