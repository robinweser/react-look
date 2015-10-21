export default (fn, threshhold = 250, scope) => {
  let last
  let deferTimer
  return () => {
    let context = scope || this

    // TODO: look at below, I don't like seeing this keyword
    return function defer() {
      const context = scope || this
      const now = +new Date
      const args = arguments

      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer)
        deferTimer = setTimeout(() => {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }
}