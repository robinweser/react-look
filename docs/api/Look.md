# Look
Look is the core function which wraps an existing React Component in order to resolve styles

### `Look(Component, styles, processors, matchState, mediaQueryListener)`
| Parameter | Type | Default | Description |
| --------- | ---- |------- | ----------- |
| Component |  | | Valid React Component you want to enhance with styles |
| styles | `Object`<br> `Array` |  | Additional styles |
| processors | `Object`<br> `Array` |  | Additional processors | 
| matchState | `Boolean` | true | If `this.state` is used to validate stateful conditions |
| mediaQueryListener | `Boolean` | false | If you need instant media query rematching if window size changes *(Otherwise you need to reload)* |  