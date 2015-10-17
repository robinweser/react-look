const CAMEL_CASE_REGEXP = /([a-z]|^)([A-Z])/g

export default (str) => {
  return str.replace(CAMEL_CASE_REGEXP, (match, p1, p2) => p1 + '-' + p2.toLowerCase())
}
