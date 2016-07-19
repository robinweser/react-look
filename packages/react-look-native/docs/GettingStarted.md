# Getting started

The following usage guide should provide enough information to build apps with Look.

1. [Installation](#1-installation)
2. [First Component](#2-first-component)
3. [Stateless Function Components](#3-stateless-function-components)
4. [Mixins & Plugins](#4-mixins--plugins)
	* 4.1. [Configuration & LookRoot](#41-configuration--lookroot)
	* 4.2. [look wrapper](#42-look-wrapper)
	* 4.3. [Usage](#43-usage)
5. [DevTools](#5-devtools)

## 1. Installation
First of all we need to install Look to our project.

```sh
npm install react-look-native --save
```

Now we are able to import Look into our code. We can either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import look from 'react-look-native'

// CommonJS
const look = require('react-look-native')
```
## 2. First Component
Now its time to compose your first Component. <br>
You basically start with a blank `React` Component that renders some markup.

```javascript
import React, { Component } from 'react'
import { View } from 'react-native'

export default class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}
```

#### StyleSheet.create(styles)
Now that we got the basic Component let's start adding some styles.<br>
We use the `StyleSheet.create` helper with React Native, but it does (by now) only return the exact same styles.

```javascript
import { StyleSheet } from 'react-look-native'
import React, { Component } from 'react'
import { View } from 'react-native'

export default class FirstComponent extends Component {
	render() {
		// pass the `style` to the element
		return <View style={styles.box}>My first Component!</View>
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
		padding: 8,
		border: '1px solid gray'
	}
})
```
#### Multiple styles
You can even have multiple styles assigned to a single node as well as multiple styles for multiple nodes.

```javascript
import { StyleSheet } from 'react-look-native'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
// We use this shortcut to write less code
const c = StyleSheet.combineStyles

export default class FirstComponent extends Component {
	render() {
		return (
			// Use the combineStyles to combine styles
			// You can pass in as many styles as you wish
			<View style={c(styles.box, styles.specialBox)}>
				<Text style={styles.title}>My first Component!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	},
	specialBox: {
		backgroundColor: 'red'
	},
	title: {
		fontWeight: 900,
		fontFamily: 'Lato'
	}
})
```

## 3. Stateless Function Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14.

```javascript
import { StyleSheet } from 'react-look-native'
import React, { Component } from 'react'
import { View } from 'react-native'

export default ({title}) => <View style={styles.box}>{title}</View>

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	}
})
```

## 4. Mixins & Plugins
For **dynamic styling** we use an advanced set of mixins and plugins. <br>
But while basic styles just work with the `StyleSheet` API by default, it **requires some configuration** to be able to use plugins, mixins or devTools.

### 4.1. Configuration & [LookRoot](api/LookRoot.md)
We will use a preset which provides every mixin & plugin available. We will refer to this as the 'global config' as it should affect every Component resolved with Look. To apply those we need to wrap our whole application into the `LookRoot` Component which uses `context` to spread the configuration to all child Components.
> Note: If you want to use a custom configuration check out the [configuration guide](../guides/configureLook.md).

```javascript
import { Presets, LookRoot } from 'react-look-native'
import React from 'react'
import { AppRegistry }  from 'react-native'

const config = Presets['react-native']

const Container = () => <LookRoot config={config}><App /></LookRoot>
AppRegistry.registerComponent('native', () => Container)
```
### 4.2. look wrapper
Resolving mixins and plugins requires your Component to be wrapped with the `look` wrapper.

```javascript
import look from 'react-look-native'
import React, { Component } from 'react'
import { View } from 'react-native'

class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}

export default look(FirstComponent)
```

#### Decorator
Alternatively you may use the decorator/annotation `@look`.
Though I do not recommend this as they neither are part of the ECMAScript 2015 specification nor part of the ECMAScript 2016 by now.

```javascript
import look from 'react-look-native'
import React, { Component } from 'react'
import { View } from 'react-native'

@look
export default class FirstComponent extends Component {
	render() {
		return <View>My first Component!</View>
	}
}
```

### 4.3. Usage
Now as you got all the configuration and wrapping done, simply start using mixins within your `StyleSheet.create`.
> Check out [Mixins.md](../Mixins.md) and [Plugins.md](../Plugins.md) to learn about every available mixin and plugin and how to use them!

```javascript
import look, { StyleSheet } from 'react-look-native'
import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	constructor() {
		super(...arguments)
		this.state = { clicks: 0 }
		this.increment = this.increment.bind(this)
	}

	increment() {
		this.setState({ clicks: this.state.clicks++ })
	}

	render() {
		return (
			<TouchableHighlight onPress={this.increment}>
				<View style={styles.box}>
					I am growing on click!
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: 'red',
		// with every click the width increments by 1 pixel
		width: (props, state) => state.clicks,
		// if specialProp is set to true the fontSize is 30
		// <FirstComponent specialProp />
		'specialProp=true': {
			fontSize: 30
		}
	}
})
```
## 5. DevTools
DevTools are **special** plugins used to boost **your** developer experience *(also now as DX)*. They come in handy if you want to *e.g.* debug your code or quality-proof it.

Look also provides some devTools which can be easily applied by just adding them to the plugins list, but you should **only use them for development**.
> Check out [Plugins.md](../Plugins.md#devtools) for an overview of all devTools.

```javascript
import { Presets, Plugins } from 'react-look-native'

const config = Presets['react-native']
config.styleLogger = { onRender: true }
config.plugins.push(Plugins.styleLogger)
```
