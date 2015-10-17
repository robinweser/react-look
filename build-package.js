var dom = "module.exports = require('./lib/dom')"
var look = "module.exports = require('./lib/look')"
var core = "module.exports = require('./lib/core')"

require('fs').writeFile('dom.js', dom, function (err) {
  if (err) return console.log(err)
  console.log('DOM-Package has been created as: dom.js (react-look/dom)')
})

require('fs').writeFile('look.js', look, function (err) {
  if (err) return console.log(err)
  console.log('Default-Package has been created as: look.js (react-look)')
})

require('fs').writeFile('core.js', core, function (err) {
  if (err) return console.log(err)
  console.log('Core-Package has been created as: core.js (react-look/core)')
})
