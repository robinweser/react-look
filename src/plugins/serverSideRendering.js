import mountingPipeline from '../utils/mountingPipeline'

export default (styles, {Component}) => {
  const existingDidMount = Component.componentDidMount
  Component.componentDidMount = () => {
    if (existingDidMount) {
      existingDidMount()
    }

    mountingPipeline.execute()
  }

  return styles
}
