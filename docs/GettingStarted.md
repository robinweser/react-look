# Getting started

Subitems show which part of Look is teached in each chapter.

1. [Installation](#1-installation)
2. [Configuration](#2-configuration)
	* `lookConfig`
	* Presets
3. [First Component](#3-first-component)
	* `look` & [`@look`](#decorator)
	* [`StyleSheet.create`](#stylesheet-createcomponent-styles)
	* [Multiple styles](#multiple-styles)
4. [Stateless Components](#4-stateless-components)
5. [Pseudo classes](#4-pseudo-classes)
6. [Media queries](#5-media-queries)
7. [Fallback values](#6-fallback-values)
8. [Other mixins](#7-other-mixins)
9. [Vendor prefixes](#8-vendor-prefixes)
10. [Server-side rendering](#8-server-side-rendering)

## 1. Installation
First of all we need to install `react-look` to our project.
```sh
npm install react-look
```

Now we are able to import Look into our code. We can either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import look from 'react-look'

// CommonJS
const look = require('react-look')
```

## 2. Configuration
Before we can use any of the features Look provides, we need to configure Look.<br>
We will use a preset which provides every mixin & plugin available. We will refer to this as the 'global config' as it should affect every Component resolved with Look. Therefore we basically just pass them as a prop of the **root-Component** that gets directly rendered into a DOM-node.
> Note: If you want to use a custom configration check out the [configuration guide](guides/configureLook.md).


```javascript
import { Presets } from 'react-look/addons'
import { render } from 'react-dom'
import React from 'react'

const config = Presets['react-dom']

// For react-native use the react-native preset
const config = Presets['react-native']


// Using the lookConfig prop will cause the configuration
// to be passed down to every Component using context
render(<App lookConfig={config} />, document.getElementById('app'))
```

## 3. First Component
Now its time to compose your first Look-enhanced Component! <br>
Start by wrapping your Component with the `look`.
```javascript
import look from 'react-look'
import React, { Component } from 'react'

class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}

// Now if importing 'FirstComponent'
// you will actually get the Look-enhanced one
export default look(FirstComponent)
```
#### Decorator
Alternatively you may use the decorator/annotation `@look`.
Though I do not recommend this as they neither are part of the ECMAScript 2015 specification nor part of the ECMAScript 2016 by now.
```javascript
import look from 'react-look'
import React, { Component } from 'react'

// Note that now you can export directly
@look
export class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}
```

#### StyleSheet.create(Component, styles)
Now that we got the basic Component let's start adding some styles.<br> We use the `StyleSheet.create` helper to generate Component-scoped styles. This heavily improves performance as it prevents resolving the styles multiple times.
> Note: You also need to import the StyleSheet module from now on!

```javascript
import look, { StyleSheet } from 'react-look'
import React, { Component } from 'react'

class FirstComponent extends Component {
	render() {
		// use the 'look' prop to pass styles
		return <div look={styles.box}>My first Component!</div>
	}
}

// Always pass the Component followed by your styles
const styles = StyleSheet.create(FirstComponent, {
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
		padding: 8,
		border: '1px solid gray'
	}
})

export default look(FirstComponent)
```

#### Multiple styles
You can even have multiple styles assigned to a single node as well as multiple styles for multiple nodes.

```javascript
import look, { StyleSheet } from 'react-look'
import React, { Component } from 'react'

class FirstComponent extends Component {
	render() {
		return (
			// Use an array of styles to assign multiple
			// They overwrite existing properties in the order they're passed
			<div look={[styles.box, styles.specialBox]}>
				<title look={styles.title}>My first Component!</title>
			</div>
		)
	}
}

// Always pass the Component followed by your styles
const styles = StyleSheet.create(FirstComponent, {
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
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

export default look(FirstComponent)
```

## 4. Stateless Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14.
> Note: This will destroy the performance benefit as Look transforms those to Stateful Components again, but it is less code to type.

```javascript
import look, { StyleSheet } from 'react-look'
import React, { Component } from 'react'

const FirstComponent = ({title}) => <div look={styles.box}>{title}</div>

// Always pass the Component followed by your styles
const styles = StyleSheet.create(FirstComponent, {
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	}
})
export default look(FirstComponent)
```
