# Plugins

Style modifications of any kind are done using plugins. Plugins are triggered directly before styles get passed to the final element. Every plugin should only do **one single job**. If there are multiple modifications to do, use multiple plugins.

## [Available plugins](plugins/)
| plugin | config | description |
| ------ | ------ | ------ |
| [mixin](plugins/Mixin.md) | `mixins` | Define custom properties using a key-value mapping. |
| [fallbackValue](plugins/fallbackValue.md) |  | Use an array of values to define alternatives/fallbacks |
| [statefulValue](plugins/StatefulValue.md) |  | Use `props`, `state` and `context` values by passing a function instead of a value.  |
| [prefixer](plugins/Prefixer.md) | `userAgent` | Automatically adds vendor prefixes according your userAgent and caniuse-database.<br> It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to do this on-the-go using the userAgent information. |

### Third-party
Right now there are no third-party plugins available. Build one? Feel free to add it here *(via pull-request)*.

## API
Every plugin gets called with a set of parameters which include several information to achieve almost any usecase.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| styles | `object` | the full style object provided with the look property |
| scopeArgs   | `object` | - wrapping React `Component`<br> - rendered `element` <br> -  `newProps` to clone the element <br> - the `StyleContainer` which collects & renders global CSS |
| config    | `object`| Contains [configuration settings](guides/configureLook.md) such as plugins, mixins, userAgent or custom config declarations |
