# Style Logger

A simple devTools that logs styles in different ways and conditions.

## Configuration
| Option | Type | Description |
| --------- | ---- | ----------- |
| onRender | `boolean` | Logs styles just before rendering the Component |
| onEvent | `string` | Logs styles if an specific `event` gets triggered <br>*e.g.* `onEvent: 'onClick'`|
| onlyTopMost | `boolean` | Mouse events like `onClick` or `onMouseEnter` only log the top most element's style |
| toString | `boolean` | Logs styles as a CSS string rather than a style object |
