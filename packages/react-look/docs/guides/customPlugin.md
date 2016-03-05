# Build your own: Plugin

A plugin basically it is just a plain function that takes the whole `styles` and **must** return a new (modified) style object. Alternatively you might want to modify any of the components passed by the interface.

## Interface
As you most likely need some more information to evaluate properly, Look provides an interface that includes lots of informations.

| Property | Type | Description |
| -------- | ----------- | --- |
| Component | *object* | React Component wrapped with look |
| element | *object* | element that gets the styles applied |
| newProps | *object* | element's new props after enhancing |
| StyleContainer | [*StyleContainer*](../api/StyleContainer.md) | global CSS container |
| config | *object* | Look configuration |
| styles | *object* | whole style object |

#### `_lookShouldUpdate`
Look also provides a special hook which can be used to force element cloning.
```javascript
const plugin = ({ styles, newProps }) => {
	// forces Look to clone the element
	newProps._lookShouldUpdate = true
	return styles
}
```
