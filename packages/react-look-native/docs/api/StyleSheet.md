# StyleSheet
A custom `StyleSheet` implementation that prevents errors and is open for optimizations.
## Methods
- [create](#createstyles)
- [combineStyles](#combinestylesstyles)

## `create(styles)`
On React Native, `StyleSheet.create` right now is just a dumb container which returns the exact same styles that come into. It just helps to reuse existing React Native Components.
```javascript
import { StyleSheet } from 'react-look-native'

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
	}
})
```

## `combineStyles(...styles)`
Styles can be combined using the `combineStyles` helper.
It simply deep assigns all styles objects.
```javascript
import { StyleSheet } from 'react-look-native'
// You will most likely use a shortcut
const c = StyleSheet.combineStyles

const styles = StyleSheet.create({
	box: { color: 'red' },
	container: { fontSize: 14 }
})

c(styles.box, styles.container) // => {color: 'red', fontSize: 14}
```
