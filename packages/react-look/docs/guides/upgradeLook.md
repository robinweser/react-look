# Upgrade guide

# 1.0.0
## API Changes

With Version 1.0 Look introduces quite some fatal API changes.
They're not likely to change a lot in the near future as the API now gets more stable and final.
### 1. StyleSheet.create
`StyleSheet.create` no longer accepts a Component as first parameter

```javascript
// New Version 1.0+
const styles = StyleSheet.create({
	box: { color: 'red' },
	container: { backgorundColor: 'blue' }
})

// Old Version < 1.0
const styles = StyleSheet.create(Button, {
	box: { color: 'red' },
	container: { backgorundColor: 'blue' }
})
```
### 2. className & style
Use `className` instead of `look` to pass your styles.<br>

```javascript
// New Version 1.0+
const Button = () => <div className={styles.box} />

// Old Version < 1.0
const Button = () => <div look={styles.box} />
```
### 3. LookRoot

Instead of passing `lookRoot: true` as Component-scoped config you now wrap your whole application tree inside the `<LookRoot>`-Component. Also pass your configuration to `<LookRoot>` instead of passing a `lookConfig` prop.

```javascript
// New Version +1.0
const App = () => <div className={styles.box} />
App = look(App)

ReactDOM.render(
	<LookRoot config={/* Look config */}>
		<App />
	</LookRoot>,
	document.getElementById('app')
)

// Old Version < 1.0
const App = () => <div look={styles.box} />
App = look(App, { lookRoot: true })

ReactDOM.render(<App lookConfig={/* Look config */}/>, document.getElementById('app'))
```
### 4. react-look/addons

Every module is now available directly from `react-look`. No `react-look/addons` anymore. Also all devTools moved into Plugins.

```javascript
// New Version 1.0+
import look, { StyleSheet, LookRoot, Plugins, Mixins, Presets } from 'react-look'

// Old Version < 1.0
import look, { StyleSheet } from 'react-look'
import { Plugins, Mixins, Presets, DevTools } from 'react-look/addons'
```
# 0.7
* `react-look/dom` & `react-look/native` are both deprecated and will be removed soon. [Configure](./configureLook.md) your own Look instance or use a preset.
* You need to add `lookRoot: true` to your top-level Component's configuration in order to render global CSS rules correctly.

# 0.5
Coming from a version below 0.5 needs some code refactoring to get Look working properly.

* Use direct style mapping instead of the string syntax.

```javascript
// new => Version 0.5+
<Demo look={styles.box} />

// old => Version < 0.5
<Demo look="box" />
```
> **Note**: There is a plugin to support the legacy syntax up to Version 1.0.0, but try to prevent using that.

* Use scoped styles with the `StyleSheet.create` helper.

> **Note**: Also styles are no more attached to the Component directly, but are defined below the Component (as it is done in React Native anyway).

```javascript
// new => Version 0.5+
import {StyleSheet} from 'react-look'

// Pass the Component as your scope
const styles = StyleSheet.create(Demo, {
	box: {
		color: 'red'
	}
})

// old => Version < 0.5
const styles = {
	box: {
		color: 'red'
	}
}
```
