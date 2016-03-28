export default function getImportAlias(declaration, specifier) {
  let alias

  declaration.node.specifiers
    .filter(spec => spec.type === 'ImportSpecifier')
    .forEach(spec => {
      if (spec.imported.name === specifier) {
        alias = spec.local.name
      }
    })

  return alias
}
