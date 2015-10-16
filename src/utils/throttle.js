export default (fn, threshhold = 250, scope) => {
  let last
  let deferTimer
  return () => {
    const context = scope || this

    return function defer() {
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
