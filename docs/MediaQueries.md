<div style="float:left"><a href="PseudoClasses.md">< <b>3. Pseudo classes</b></a></div>
<div style="float:right"><a href="StatefulConditions.md"><b>5. Stateful conditions > </b></a></div>

# 4. Media Queries

Look supports media-queries using a common syntax. There are actually two different ways to use them.

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
> Check [FAQ: Server-side rendering](FAQ.md#5-server-side-rendering) for an approach I figured out while working for **[uniJS](https://github.com/unijs/unijs)**.

### matchMedia API
Look's provides an [API](api/matchMedia.md) to replace the default validation method.

