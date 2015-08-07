<div style="float:left"><a href="Look.md">< <b>1. Look</b></a></div>
<div style="float:right"><a href="State.md"><b>3. State</b> ></a></div>

# 2. Global
Global is a class that extends [CSSSheet](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/CSSSheet.md) from [Dynamic Style Sheets](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets).
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
You may pass a `unit` with your constructor. Default is `px`.

Global then uses [DSS-Units](https://github.com/dynamicstylesheets/DSS-Units) to process all selectors and add units if needed. Otherwise all unit-specific values without units (such as `padding`, `margin` or `fontSize`) won't get applied as CSS.

## Usage
```javascript
let sheet = new Global({
	'*' : {
		padding: 20,
		margin: 20
	},
	'.selector' : {
		fontSize: 15,
		lineHeight: 1.5
	}
}, 'rem')

sheet.apply(); //adds your styles to your document
```
