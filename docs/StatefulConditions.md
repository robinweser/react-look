# 4. Stateful Conditions

Look implements a shortcut to specify state-specific styles. It supports 6 different operators: `>=`, `<=`, `!=`, `=`, `>` and `<`.<br>
This improves readability since you won't need to use expressions like this: `style={[styles.box, this.state.active && styles.active]}`. <br>
This also helps to keep some kind of separation of concerns since you have all your styles compact in one place.

### Idea
There are several states which are quite common to style a component state-specific. We call such states **style-state** since its only purpose is to validate component styling which is UI-only.
> **Note**: Please do not use stateful conditions with other than style-states since this would destroy semantics.

## Example
```javascript
{
	box : {
		color: 'blue',
		fontSize: 20,
		background: '#fff',
		'status=active' : {
			color: 'red',
			background: 'gray'
		}
	}
}
```
Just as pseudo classes and media queries, stateful conditions can be nested. They can also contain nested pseudo classes and media queries.

## Validation
Looks takes `this.props` and `this.state` and checks if there is a key that matches the condition. e.g. `status=active` gets validated with `this.props['status'] === 'active'`.

## Advanced
You can even use dot-notation to adress deeper nested props and state. e.g. `items.name=foo`.
