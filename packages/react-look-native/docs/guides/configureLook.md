# Configuring Look
Look itself ships as a higher order function that just resolves basic styles. To be able to use plugins, mixins and devTools you need to pass some configuration.

Basically you will set an array of plugins which will perform in the exact same order as specified.
Plugins might also require some special settings within your config object.
e.g. the **Mixin**-Plugin which lets you define custom style properties uses the `mixins` key to define those.


### Example
```javascript
import { Mixins, Plugins } from 'react-look'

const customConfig = {
	// a list of used plugins ordered by
	// execution order
	plugins: [
		Plugins.mixin
	],

	// any special setting used by plugins
	mixins: {
		'substr': Mixins.sbustr
	}
}
```

### Presets
Right now there's just one global preset:

`react-native`
Contains only react-native compatible plugins and mixins
```javascript
import { Presets } from 'react-look-native'
const customConfig = Presets['react-native']
```
## Applying configuration
To apply configuration globally just [pass them with `LookRoot`](../api/LookRoot.md#usage) at the root of your application.
This will automatically pass your configuration to every child Component via `context`.

## Component-based configuration
Besides passing global configuration, you sometimes might also want to apply some configuration for just a single Component. It will be merged with the global configuration with higher precedence *(so it might overwrite global configuration)*.
```javascript
import { Text } from 'react-native'
import look, { StyleSheet } from 'react-look-native'

const Example = () => <Text style={styles.box}>Foo</Text>
const styles = StyleSheet.create({
	box: {
		fontSize: 12,
		'special': /* do something */
	}
})

const specialMixin = input => ({ /* do something */ })
// You only need the alternative plugin to resolve an array of values
export default look(Example, { mixins: { special: specialMixin } })
```

## Element-based configuration
You could even pass configuration for just a single element using the `lookConfig` prop.

```javascript
import { View, Text } from 'react-native'
import look, { StyleSheet } from 'react-look-native'

const Example = () => (
	<View style={styles.box}>
		<Text lookConfig={{ plugins: undefined }}>No plugins for me!</Text>
	</View>
)
const styles = StyleSheet.create({
	box: {
		fontSize: 12,
		'special': /* do something */
	}
})

export default look(Example)
```
