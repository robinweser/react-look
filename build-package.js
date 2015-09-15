var dom = "module.exports = require('./lib/dom')";
var look = "module.exports = require('./lib/look')";

require('fs').writeFile('dom.js', dom, function (err) {
  if (err) return console.log(err);
  console.log('dom.js created');
});

require('fs').writeFile('look.js', look, function (err) {
  if (err) return console.log(err);
  console.log('look.js created');
});