var native = 'module.exports = require(\'./lib/native\')';

var fs = require('fs');

function createPackage(pkg, packageModule, packagePath) {
  fs.writeFile(pkg, packageModule, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(packagePath + ' has been created as ' + pkg);
  });
}

createPackage('native.js', native, 'react-look/native');
