# StyleSheet
A helper to create scoped styles and global CSS styles. This helps to improve performance by reducing unnecessary style resolving/processing.

## Methods
- [create](#createcomponent-styles)
- [combineStyles](#combinestyles-styles)
- [toCSS](#tocssstyles--scope-useragent)
- [keyframes](#keyframesframes--name-useragent)
- [font](#fontfontfamily-files--properties)


## create(styles [, Component])
Splits the `styles` into static and dynamic styles, renders the static styles to CSS classes and returns the `className`. Optionally add the Component or alternatively a `string` that's used as the class scope *(makes debugging ways easier)*.

ClassNames are generated using a content hash, so same style objects will lead to the same `className` and therefore will only be added once.

### Pseudo classes
Pseudo classes are considered to start with either `:` or `::`. They will automatically get transformed to pure CSS pseudo class selectors.
```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		':hover': {
			color: 'blue',
			// They can also be nested multiple times
			':active': {
				color: 'gray'
			}
		}
	},
})
```
This will generate the following CSS *(`.wrg802` is just an example)*
```CSS
.wrg802:hover:active { color: gray }
.wrg802:hover { color: blue }
.wrg802 { color: red }
```

### Media queries
Media queries are considered to start with `@media`. They will also get transformed to pure CSS immediately.

```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		'@media (min-height: 300px)': {
			color: 'blue',
			// They can also be nested multiple times
			'@media (min-width: 500px)': {
				color: 'gray'
			}
		}
	},
})
```
This will generate the following CSS *(`.wrg802` is just an example)*
```CSS
.wrg802 { color: red }
@media (min-height: 300px) {
	.wrg802 { color: blue }
}
@media (min-height: 300px) and (min-width: 500px) {
	.wrg802 { color: gray }
}
```

## combineStyles(...styles)
Styles can be combined using the `combineStyles` helper. It simply joins two classNames separated with a space.
```javascript
import { StyleSheet } from 'react-look'
// You will most likely use a shortcut
const c = StyleSheet.combineStyles

const styles = StyleSheet.create({
	box: { color: 'red' },
	container: { fontSize: 14 }
})

c(styles.box, styles.container) // => wrg802 fqvmt1
```

## toCSS(styles [, scope])
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
## keyframes(frames [, name])
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

## font(fontFamily, files [, properties])
> Note: [lookRoot](../FAQ.md#2-global-css-rules) must be set to render these CSS rules

Adds the `fontFamily` to the global CSSStyleSheet and uses `files` as source for fonts. `files` may either be a string (single) or an array (multiple).<br>
`properties` may contain additional font properties which are:
* `fontWeight`
* `fontStretch`
* `fontStyle`
* `unicodeRange`

```javascript
const fontStyles = {fontWeight: 400, fontStretch: 'condensed'}
const files = ['../fonts/Arial.ttf', '../fonts/Arial.svg', '../fonts/Arial.woff']

StyleSheet.font('Arial', files, fontStyles)
```
