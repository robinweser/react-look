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

// Copies LICENSE into a pgk subfolder
function copyLICENSE(pkg) {
  fs.copy(__dirname + '/../LICENSE', __dirname + '/../packages/' + pkg + '/LICENSE', err => {
    errorOnFail(err)
    console.log('LICENSE was successfully copied into the ' + pkg + ' package.')
  })
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
      // Check if this version has already been released
      if (packageJSON.version === globalVersion) {
        errorOnFail('Version ' + globalVersion + ' has already been released.')
      }

      packageJSON.version = globalVersion

      // Update react-look-core dependency version
      if (pkg !== 'react-look-core') {
        packageJSON.dependencies['react-look-core'] = '^' + globalVersion
      }

      const newPackageJSON = JSON.stringify(packageJSON, null, 4)

      fs.writeFile(__dirname + '/../packages/' + pkg + '/package.json', newPackageJSON, err => {
        errorOnFail(err)
        console.log('Successfully updated ' + pkg + ' version and react-look-core dependency version to ' + globalVersion + '.')
      })
    })
  })
}

// Helper to run all preperation scripts
function preparePackage(pkg) {
  updateVersion(pkg)
  copyLICENSE(pkg)
}

preparePackage('react-look-core')
preparePackage('react-look')
preparePackage('react-look-native')
