export default (...message) => {
  // only throw warnings if devmode is enabled
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Look Warning: ', ...message)
  }
}
