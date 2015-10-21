# Upgrade guide

## 0.5
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
import {StyleSheet} from 'Look'

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


