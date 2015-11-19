var dom = 'module.exports = require(\'./lib/dom\')';
var look = 'module.exports = require(\'./lib/look\')';
var core = 'module.exports = require(\'./lib/core\')';
var addons = 'module.exports = require(\'./lib/addons\')';

var fs = require('fs');

function createPackage(package, packageModule, packagePath) {
  fs.writeFile(package, packageModule, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(packagePath + ' has been created as ' + package);
  });
}

createPackage('dom.js', dom, 'react-look/dom');
createPackage('look.js', look, 'react-look');
createPackage('core.js', core, 'react-look/core');
createPackage('addons.js', addons, 'react-look/addons');
