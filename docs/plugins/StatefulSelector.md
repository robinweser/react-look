# Stateful selectors

If you almost only have dynamic styles, you most likely feel a bit repeating using [Stateful values](./StatefulValue.md) for every property. Stateful selectors opens the ability to not only use it on single properties but on a whole selector.

```javascript
{
	box: (props, state, context) => ({
		color: context.theme.color,
		fontSize: props.size * state.zoom
  })
}
```

Resolving works exactly as it does for [Stateful values](./StatefulValue.md) so you don't need to worry that your Component won't update styles, **it does automatically**.
