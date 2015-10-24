export default (str) => str.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase())
