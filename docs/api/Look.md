# Look
Look is the core function which wraps an existing React Component in order to resolve styles

## `Look(Component [, config])`
| Parameter | Description |
| --------- | ----------- |
| Component | Valid React Component you want to enhance with styles |
| config    | An object containing all configuration settings |

### config options
There are some configuration options that can be set by now. Check out the [configuration guide](../guides/configureLook.md) to learn how to configure Look.

| Option | Type | Description |
| --------- | --- | ----------- |
| plugins | `Array` | Set of [plugins](../Plugins.md) used to process styles |
| mixins | `Object` | key-value pairs of [mixin](../Mixins.md) definitions
| userAgent    | `string` | userAgent to detect platform  information & prefix styles |
| lookRoot | `boolean` | Defines the top-level Component. Used to render global CSS rules |
