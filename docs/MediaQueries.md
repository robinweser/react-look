# 3. Media Queries (DOM-only)

Look supports media-queries using the [Custom Property](../src/plugins/customProperty.js) plugin.

## Example
```javascript
{
	// nested media query
	box : {
		color: 'blue',
		fontSize: 20,
		background: '#fff',
		'@media (min-width: 800px)' : {
			color: 'red',
			background: 'gray'
		}
	}
}
```

Similar to pseudo classes, media queries can be nested. They can also include pseudo classes and stateful conditions.

## Validation
By default Look uses `window.matchMedia` to validate media queries. Though some browser don't support matchMedia. You may add a **polyfill** or **replace** it with your own. Please read on for more information.

## Server-side rendering
By now there is no "perfect" way to validate media queries on server-side without performance loss *(initial request to get client dimensions)* or without a chance to missmatch the size *(e.g. validation e.g. the `userAgent`)*.<br>
By default the media query plugin uses the `navigator.userAgent`. You may pass a custom userAgent within the `config` object.
> See the guide [self-configured Look](guides/configureLook.md)

