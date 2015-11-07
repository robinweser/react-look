export default (fn, threshhold = 250, scope) => {
  let last
  let deferTimer
  return function() {
    let context = scope || this

    let now = +new Date
    let args = arguments
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
