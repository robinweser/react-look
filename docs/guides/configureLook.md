# 1. Configuring Look
As the default configurations are just importing every plugin and custom property definition possible they're kind of bloated and static.

Luckily, it is really easy to create a custom configured Look yourself. You just need to import the pure Enhancer from the core package. Then you can compose it with any valid config object.

Basically you will set an array of plugins which will perform in the exact same order as specified.
Plugins might also require some special settings within your config object.
e.g. the **Custom Property**-Plugin which lets you define custom style properties (used to implement pseudo classes) uses the key `customProperties` setting to define those.

> Check out the given [preconfigurations](../../src/preconfig) for React (DOM) and React Native

```javascript
import {Mixins, Plugins} from 'react-look/addons'

const config = {
	// a list of used plugins ordered by
	// execution order
	plugins: [
		Plugin.mixin
	],

	// any special setting used by plugins
	// e.g. mixin definitions or a userAgent
	// used by the autoprefixer
	mixins : {
		':hover': Mixins.hover,
		':last-child': Mixins.lastChild,
		'@media': Mixins.mediaQuery
	},
	userAgent: 'Mozilla/5.0 ...'
}
```

Then you can just need to export this as your own composed Look instance.

```javascript
import Look from 'react-look/core'

// Basically just a wrapper function
// calling Look with a specific config object
export default (...args) => {
	return Look(...args, config)
}
```
