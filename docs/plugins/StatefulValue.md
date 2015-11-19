# Stateful values

You most likely will have some styles that depend on `props`, `state` or `context` values. In other words you want your styles to be dynamic. Achieving this with pure CSS is quite a mess, but with the `statefulValue`-plugin you can just pass a function with `props`, `state` or `context` as parameters.

```javascript
{
	box: {
		color: 'blue',
		fontSize: (props, state, context) => props.size * state.zoom
	}
}
```

As React Components automatically rerender if the `state` changes, the `fontSize` will be updated as well.
