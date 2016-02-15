import fs from 'fs-extra'

console.log()
console.log('############################################')
console.log('########## Preparing npm packages ##########')
console.log('############################################')
console.log()
// Small helper to error and exit on fail
const errorOnFail = err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Updates the package.json version of a given pkg with the global
// package.json version
function updateVersion(pkg) {
  fs.readFile(__dirname + '/../package.json', 'utf8', (err, data) => {
    errorOnFail(err)
    const globalVersion = JSON.parse(data).version

    fs.readFile(__dirname + '/../packages/' + pkg + '/package.json', (err, data) => {
      errorOnFail(err)

      const packageJSON = JSON.parse(data)
      packageJSON.version = globalVersion
      const newPackageJSON = JSON.stringify(packageJSON, null, 4)

      fs.writeFile(__dirname + '/../packages/' + pkg + '/package.json', newPackageJSON, err => {
        errorOnFail(err)
        console.log('Successfully updated ' + pkg + ' version to ' + globalVersion + '.')
      })
    })
  })
}

// Copies Babel transformed code modules into a given pkg folder
function copyModules(pkg) {
  fs.copy(__dirname + '/../lib/', __dirname + '/../packages/' + pkg + '/lib/', err => {
    errorOnFail(err)
    console.log('Package modules for ' + pkg + ' have successfully been prepared.')
  })
}

// Helper to run all preperation scripts
function preparePackage(pkg) {
  copyModules(pkg)
  updateVersion(pkg)
}

preparePackage('react-look')
preparePackage('react-look-native')
