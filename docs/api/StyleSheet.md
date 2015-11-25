# StyleSheet
A helper to create scoped styles and global CSS StyleSheets. This helps to improve performance by reducing unnecessary style resolving/processing.

## Methods
- [create](#createcomponent-styles)
- [toCSS](#tocssstyles--config)
- [keyframes](#keyframesframes--config)
- [fontFace](#fontfacefontfamily-files--properties-config)


### `create(Component, styles)`
Creates a scoped `styles` object to reduce style resolving when nesting Components enhanced by Look. The scope also serves as reference to the used `Component`.
> NOTE: This is optional as you may also use a plain JavaScript object as styles, but it improves rendering performance and is considered best practice.

### `toCSS(styles [, config])`
Adds all `styles` as a valid CSS string and directly applies those to the global CSSStyleSheet. <br>

##### `config` (optional)

* `scope`: Specificity selector which gets added before every selector *(e.g. `.#demo-container`)*
* `unit`: Unit that gets added to number values *(default to `px`)*
* `userAgent`: userAgent used to detect required vendor-prefixes

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
### `keyframes(frames [, config])`
Adds the `frames` as a new keyframe animation to the global CSSStyleSheet and returns the animation name.
`frames` should be an object containing a set of percentage-based styles. or both `from` and `to` values.<br>

##### `config` (optional)

* `name`: animation name if an exact one is needed
* `unit`: Unit that gets added to number values *(default to `px`)*
* `userAgent`: userAgent used to detect required vendor-prefixes
* `globalStyleElement`: (server-side rendering) custom `<style></style>`-element to insert CSSRules

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

### `fontFace(fontFamily, files [, properties, config])`
Adds the `fontFamily` to the global CSSStyleSheet and uses `files` as source for fonts. `files` may either be a string (single) or an array (multiple).<br>
`properties` may contain additional font properties which are `fontWeight`, `fontStretch`, `fontStyle` and  `unicodeRange`.

##### `config` (optional)

* `globalStyleElement`: (server-side rendering) custom `<style></style>`-element to insert CSSRules

```javascript
const fontStyles = {fontWeight: 400, fontStretch: 'condensed'}
const files = ['../fonts/Arial.ttf', '../fonts/Arial.svg', '../fonts/Arial.woff']

StyleSheet.fontFace('Arial', files, fontStyles)
```
