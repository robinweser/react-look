# StyleSheet
A helper to create scoped styles and global CSS StyleSheets. This helps to improve performance by reducing unnecessary style resolving/processing.

## Methods
- [create](#createcomponent-styles)
- [toCSS](#tocssstyles--scope-media-id)


### `create(Component, styles)`
Creates a scoped `styles` object to reduce style resolving when nesting Components enhanced by Look. The scope also serves as reference to the used `Component`.

### `toCSS(styles [, scope, media, id])`
Creates a `<style></style>`-tag, adds all `styles` as a valid CSS string and directly applies itself to the `document.head`.
<br>
Returns the generated <style>-**DOMElement**.

#### Optional parameter
| Parameter | Description |
| --------- | ----------- |
| scope    | Specificity selector |
| media    | media query for the styles |
| id   | id reference attached to the `<style></style>`-tag  |
