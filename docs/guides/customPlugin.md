# Build your own: Plugin

A plugin basically it is just a plain function that takes the whole `styles` and **must** return a new (modified) style object. Alternatively you might want to modify any of the components passed by the interface.

## Interface
As you most likely need some more information to evaluate properly, Look provides an interface that includes lots of informations.

| Property | Type | Description |
| -------- | ----------- | --- |
| Component | *object* | React Component wrapped with look |
| element | *object* | element that gets the styles applied |
| newProps | *object* | element's new props after enhancing |
| StyleContainer <img src="../res/dom-badge.png" height=15> | [*StyleContainer*](../api/StyleContainer.md) | global CSS container |
| config | *object* | Look configuration |
| styles | *object* | whole style object |

## Example
Let's say we want to recreate the [prefixer](../plugins/Prefixer.md) which uses [caniuse.com](caniuse.com) data and `userAgent` parsing to detect browser information to prefix styles.
```javascript
import Prefixer from 'inline-style-prefixer'

// first we create a new prefixer instance
// if no userAgent is passed it uses navigator.userAgent
const plugin = ({ styles, config }) => {
	const prefixer = new Prefixer(config.userAgent)

	return prefixer.prefix(styles)
}
```
