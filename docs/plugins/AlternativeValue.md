# Alternative values

Sometimes you want to provide alternative values also know as *fallback values*. <br>
For example in Internet Explorer 8 there is no `rgba` compatibility for colors which means just passing *e.g. `color: rgba(0, 0, 0, 0.5)`* would not be applied correctly.
By passing an array of values you may provide fallback values.

> **Note**: The main purpose of fallback values is to achieve better cross-browser compatibility.

```javascript
{
	box: {
		color: ['#ccc', 'rgba(0, 0, 0, 0.5)']

		// This would outputcolor
		// color: '#ccc;color:rgba(0, 0, 0, 0.5)'
	}
}
```
which is similar to the following CSS code:
```CSS
.box {
	color: #ccc;
	color: rgba(0, 0, 0, 0.5);
}
```
