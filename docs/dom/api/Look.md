# look
`look` is the core function which wraps an existing React Component in order to resolve plugins and mixins. <br>
Optionally pass some configuration which will get merged with the global configuration and be active **only** within the wrapped `Component`.

## `look(Component [, config])`
| Parameter | Description |
| --------- | ----------- |
| Component | Valid React Component you want to enhance with styles |
| config    | An object containing all [configuration settings](../../guides/configureLook.md) |
