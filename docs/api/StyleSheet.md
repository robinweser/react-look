# StyleSheet
A helper to create scoped styles and global CSS styles.
## Methods
- [create](#createstyles)
- [combineStyles](#combinestylesstyles)
- [toCSS](#tocssstyles--scope) <img src="../res/dom-badge.png" height=15>
- [keyframes](#keyframesframes--name) <img src="../res/dom-badge.png" height=15>
- [font](#fontfontfamily-files--properties) <img src="../res/dom-badge.png" height=15>


## `create(styles)`
<img src="../res/dom-badge.png" height=25>

Splits the `styles` into static and dynamic styles, renders the static styles to CSS classes and returns the `className`. Optionally add the Component or alternatively a `string` that's used as the class scope *(makes debugging ways easier)*.

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
This will generate the following CSS *(`.c1` is just an example)*
```CSS
.c1:hover:active { color: gray }
.c1:hover { color: blue }
.c1 { color: red }
```
#### LVH(F)A
It adheres to the LVHA rule which means it orders `:link`, `:visited`, `:hover`, (`:focus`) and `:active` correctly.

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
This will generate the following CSS *(`.c1` is just an example)*
```CSS
.c1 { color: red }
@media (min-height: 300px) {
	.c1 { color: blue }
}
@media (min-height: 300px) and (min-width: 500px) {
	.c1 { color: gray }
}
```
<br>
<img src="../res/native-badge.png" height=25>

On React Native, `StyleSheet.create` right now is just a dumb container which returns the exact same styles that come into. It just helps to reuse existing React Native Components.
```javascript
import { Native: { StyleSheet } } from 'react-look'

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

## `combineStyles(...styles)`
Styles can be combined using the `combineStyles` helper.

<img src="../res/dom-badge.png" height=15> It simply joins `className`s separated with a space.<br>
<img src="../res/native-badge.png" height=15> It simply deep assigns all styles objects.
```javascript
import { StyleSheet } from 'react-look'
// You will most likely use a shortcut
const c = StyleSheet.combineStyles

const styles = StyleSheet.create({
	box: { color: 'red' },
	container: { fontSize: 14 }
})

c(styles.box, styles.container) // => c1 c2
```

## `toCSS(styles [, scope])` <img src="../res/dom-badge.png" height=20>
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
## `keyframes(frames [, name])` <img src="../res/dom-badge.png" height=20>
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

## `font(fontFamily, files [, properties])` <img src="../res/dom-badge.png" height=20>
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
