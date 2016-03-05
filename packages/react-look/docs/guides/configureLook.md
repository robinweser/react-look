# Configuring Look
Look itself ships as a higher order function that just resolves basic styles. To be able to use plugins, mixins, prefixer and devTools you need to pass some configuration.

Basically you will set an array of plugins which will perform in the exact same order as specified.
Plugins might also require some special settings within your config object.
e.g. the **Mixin**-Plugin which lets you define custom style properties uses the `mixins` key to define those.


### Example
```javascript
import { Mixins, Plugins, StaticPrefixer } from 'react-look'

const customConfig = {
	// a list of used plugins ordered by
	// execution order
	plugins: [
		Plugins.mixin,
		Plugins.fallbackValue
	],

  // special prefixer key to pass an instance
  // of a valid style prefixer
  prefixer: new StaticPrefixer(),

	// any special setting used by plugins
	// e.g. mixin definitions or a userAgent
	// used by the autoprefixer
	mixins: {
		'substr': Mixins.sbustr,
		'@platform': Mixins.platformQuery
	},

  // to you @platform you need to pass a userAgent
	userAgent: 'Mozilla/5.0 ...'
}
```
### Common config keys
| key | default | description |
|-----|--|------------|
|plugins|`[]` |An array of plugins to transform your styles |
|mixins|`{}`|Mixin definitions to add new style properties|
|prefixer|[Prefixer](../api/Prefixer.md)|Adding vendor-prefixes with a valid prefixer instance|
|userAgent|`navigator.userAgent`|used to validate [platform queries](../Mixins.md#platformqueries)
|styleElementId|`_react-look-stylesheet`| The `id` of a special `<style>`-tag to add all the CSS styles
### Presets
Right now there's just one global preset:

`react-dom`
Contains every DOM-specific plugin and mixin available<br>
```javascript
import { Presets } from 'react-look'
const customConfig = Presets['react-dom']
```
## Applying configuration
To apply configuration globally just [pass them with `LookRoot`](../api/LookRoot.md#usage) at the root of your application.
This will automatically pass your configuration to every child Component via `context`.

## Component-based configuration
Besides passing global configuration, you sometimes might also want to apply some configuration for just a single Component. It will be merged with the global configuration with higher precedence *(so it might overwrite global configuration)*.

```javascript
import look, { StyleSheet } from 'react-look'

const Example = () => <div className={styles.box}>Foo</div>
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
import look, { StyleSheet } from 'react-look'

const Example = () => (
	<div className={styles.box}>
		<span lookConfig={{ plugins: undefined }}>No plugins for me!</span>
	</div>
)
const styles = StyleSheet.create({
	box: {
		fontSize: 12,
		'special': /* do something */
	}
})

export default look(Example)
```
