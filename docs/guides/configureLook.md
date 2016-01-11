# Configuring Look
Look itself ships as a higher order function that just resolves basic styles. To be able to use pseudo classes, media queries and all the other features you need to pass some configuration.

Basically you will set an array of plugins which will perform in the exact same order as specified.
Plugins might also require some special settings within your config object.
e.g. the **Mixin**-Plugin which lets you define custom style properties uses the `mixins` key to define those.
> Check out the [Look API docs](../api/Look.md) for a complete list of possible config options.

### Custom configuration
```javascript
import { Mixins, Plugins } from 'react-look/addons'

const customConfig = {
	// a list of used plugins ordered by
	// execution order
	plugins: [
		Plugins.mixin,
		Plugins.alternativeValue,
		Plugins.prefixer
	],

	// any special setting used by plugins
	// e.g. mixin definitions or a userAgent
	// used by the autoprefixer
	mixins: {
		':hover': Mixins.hover,
		':last-child': Mixins.lastChild,
		'@media': Mixins.mediaQuery
	},
	userAgent: 'Mozilla/5.0 ...'
}
```

### Presets
Right now there are just two presets:
* `react-dom`: Contains every DOM-specific plugin and mixin available
* `react-native`: Contains only react-native compatible plugins and mixins

```javascript
import { Presets } from 'react-look/addons'

const customConfig = Presets['react-dom']
```

## Applying configuration
There are two different ways to apply your configuration globally.

### Custom instance
```javascript
import Look from 'react-look'

// Basically just a wrapper function
// calling Look with a specific config object
export default (Component, config) => {
	// Use this to allow Component-scoped configs later on
	const configuration = Object.assign({}, customConfig, config)
	return Look(Component, configuration)
}
```
```javascript
import Look from './customLook'
import { StyleSheet } from 'react-look'

const Example = () => <div look={styles.box}>Foo</div>
const styles = StyleSheet.create(Example, {box: {color: 'red'}})

export default Look(Example)
```

### Pass lookConfig as a prop
Basically you will only do this once on your top-level Component which is the root Component Look renders. The primary use case is server-side rendering where you might want to pass e.g. a *userAgent* from request headers directly.
```javascript
import 'react' from 'react'
import Look from 'react-look'

const App = () => <div>/*App content*/</div>
export default Look(App)
```
```javascript
import App from './App'
import React from 'react'
import { render } from 'react-dom'

render(<App lookConfig={customConfig} />, document.getElementById('app'))
```

## Component-based configuration
While both examples above will hand the configuration down to all the child Components you may also want to apply some configuration for just a single Component.
```javascript
import Look from 'react-look'
import { Plugins } from 'react-look/addons'
import { StyleSheet } from 'react-look'

const Example = () => <div look={styles.box}>Foo</div>
const styles = StyleSheet.create(Example, {
	box: {
		color: ['#ccc', 'rgba(0, 0, 0, 0.5)'],
		fontSize: 12
	}
})

// You only need the alternative plugin to resolve an array of values
export default Look(Example, {plugins: [Plugins.alternativeValue]})
```
