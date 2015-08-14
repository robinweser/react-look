<div style="float:left"><a href="Look.md">< <b>1. Look</b></a></div>
<div style="float:right"><a href="State.md"><b>3. State</b> ></a></div>

# 2. CSS
CSS is a class that extends [CSSSheet](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md) from [Dynamic Style Sheets](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets).
Core functionality has been adopted, including the following methods:
* [apply](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##apply)
* [update](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##update)
* [detach](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##detach)
* [enable](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##enable)
* [disable](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##disable)
* [compile](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##compileselector)
* [toCSS](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##tocssselector)
* [isActive](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##isactive)
* [isRegistered](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md##isregistered)

For detailed information check the [CSSSheet API documentation](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md) or directly click a function.

> **Note**: Since CSSSheet extends Sheet, Global also knows all methods of [Sheet](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.md).

## react-look specific methods
### Unit
You may pass a `unit` with your constructor. Default is `px`.

CSS then uses [DSS-Units](https://github.com/dynamicstylesheets/DSS-Units) to process all selectors and add units if needed. Otherwise all unit-specific values without units (such as `padding`, `margin` or `fontSize`) won't get applied.

### Scope
You can also provide a scope within which the styles should get applied.
## Usage
```javascript
let sheet = new CSS({
	'*' : {
		padding: 20,
		margin: 20
	},
	'.selector' : {
		fontSize: 15,
		lineHeight: 1.5
	}
}, 'rem', '.scope')

sheet.apply(); //adds your styles to your document
```

This would create the following CSS StyleSheet.
```CSS
.scope * {
	padding: 20rem;
	margin: 20rem;
}

.scope .selector {
	fontSize: 15rem;
	lineHeight: 1.5
}
```
