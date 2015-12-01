const pipeline = new Set()

export default {
  add(fn) {
    pipeline.add(fn)
  },

  execute() {
    if (pipeline.size > 0) {
      pipeline.forEach(entry => {
        if (entry instanceof Function) {
          entry()
        }
        pipeline.delete(entry)
      })
    }
  },

  get() {
    return pipeline
  }
}
