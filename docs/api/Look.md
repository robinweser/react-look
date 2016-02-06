# look
`look` is the core function which wraps an existing React Component in order to resolve plugins and mixins. <br>
Optionally pass some configuration which will get merged with the global configuration and be active **only** within the wrapped `Component`.

## `look(Component [, config])`
| Parameter | Description |
| --------- | ----------- |
| Component | Valid React Component you want to enhance with styles |
| config    | An object containing all configuration settings |


### config options
There are some configuration options that can be set by now. Check out the [configuration guide](../guides/configureLook.md) to learn how to configure Look.

| Option | Type | Description |
| --------- | --- | ----------- |
| plugins | *array* | Set of [plugins](../Plugins.md) used to process styles |
| mixins | *object* | key-value pairs of [mixin](../Mixins.md) definitions
| userAgent    | *string* | userAgent to detect platform  information & prefix styles |
| lookRoot | *boolean* | Defines the top-level Component. Used to render global CSS rules |
| linter | *object* | Configures the [linter](../devTools/linter.md) devTools |
