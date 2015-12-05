# StyleSheet
A helper to create scoped styles and global CSS StyleSheets. This helps to improve performance by reducing unnecessary style resolving/processing.

## Methods
- [create](#createcomponent-styles)
- [toCSS](#tocssstyles--scope-useragent)
- [keyframes](#keyframesframes--name-useragent)
- [fontFace](#fontfacefontfamily-files--properties)


### `create(Component, styles)`
Creates a scoped `styles` object to reduce style resolving when nesting Components enhanced by Look. The scope also serves as reference to the used `Component`.
> NOTE: This is optional as you may also use a plain JavaScript object as styles, but it improves rendering performance and is considered best practice.

### `toCSS(styles [, scope])`
> Note: [lookRoot](../FAQ.md#2-global-css-rules) must be set to render these CSS rules

Adds all `styles` as a valid CSS string and directly applies those to the global CSSStyleSheet. `scope` will also add a scope selector to add more specificity.

```javascript
StyleSheet.toCSS({
	'*': {
		padding: 0,
		margin: 0,
		boxSizing: 'border-box'
	},
	'#special li.selected': {
		/* ... */
	}
})
```
### `keyframes(frames [, name])`
> Note: [lookRoot](../FAQ.md#2-global-css-rules) must be set to render these CSS rules

Adds the `frames` as a new keyframe animation to the global CSSStyleSheet and returns the animation name.
`frames` should be an object containing a set of percentage-based styles. or both `from` and `to` values.<br> You may also pass a custom animation `name`.

```javascript
StyleSheet.keyframes({
	'0%': {
		transform: 'rotate(0deg)'
	},
	'50%': {
		transform: 'rotate(45deg)'
	},
	'100%': {
		transform: 'rotate(90deg)'
	}
})
```

### `fontFace(fontFamily, files [, properties])`
> Note: [lookRoot](../FAQ.md#2-global-css-rules) must be set to render these CSS rules

Adds the `fontFamily` to the global CSSStyleSheet and uses `files` as source for fonts. `files` may either be a string (single) or an array (multiple).<br>
`properties` may contain additional font properties which are `fontWeight`, `fontStretch`, `fontStyle` and  `unicodeRange`.

```javascript
const fontStyles = {fontWeight: 400, fontStretch: 'condensed'}
const files = ['../fonts/Arial.ttf', '../fonts/Arial.svg', '../fonts/Arial.woff']

StyleSheet.fontFace('Arial', files, fontStyles)
```
