# Look
Look is a class that extends [Sheet](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.md) from [Dynamic Style Sheets](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets).    
Core functionality has been adopted, including the following methods:
- [process](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdhttps://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdprocessprocessor-args)
- [add](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdaddselectors--overwrite--false)
- [addSelector](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdaddselectorselector--overwrite--false)
- [addRule](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdaddruleselector-property-value--overwrite--false)
- [remove](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdremoveselectors)
- [removeSelector](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdremoveselectorselector)
- [removeRule](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdremoveruleselector-rule)
- [removeRules](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdremoverulesselector-rules)
- [removeAll](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdremoveall)
- [modify](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdmodifyselector)
- [modifySelector](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdmodifyselectorselector-rules)
- [modifyRule](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdmodifyselector-property-value)
- [replace](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdreplaceselectors)
- [replaceSelector](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.mdreplaceselector-rules)

For detailed information check the [Sheet API documentation](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/docs/api/Sheet.md) or directly click a function.

## react-look specific methods
### `process(processors [, ...args])`
The process method has been extended to also accept an array of `processors` as a small shortcut.

### `applyTo(component [, matchState, resizeListener])`
applyTo needs to be called in order to apply your styles to a `component`.<br>
Set `matchState` if you want stateful conditions such as `status=active` to also match `this.state` in addition to `this.props`.<br>
Set `resizeListener` if you want a resize listener to be added to your containing `component` in order to enable instant media query rematching.