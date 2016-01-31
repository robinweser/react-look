# Mixin
The mixin plugin is basically the most important one as it resolves custom properties such as *platform queries*, *stateful conditions* and much more.

Mixins can be nested multiple times to achieve e.g. `:focus:hover`.

## Available mixins
Check out [Mixins.md](../Mixins.md) which provides a complete and detailed list of all build-in mixins that are available.

## API
Every mixin gets called with 5 different paremeters.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| property | `string` | exact property used |
| value | `any` | actuall style value |
| mixinKey | `string` | mixin reference key (always includes, often equals `property`) |
| scopeArgs   | `any` | - wrapping React `Component`<br> - rendered `element` <br> -  `newProps` to clone the element <br> - the `StyleContainer` which collects & renders global CSS |
| config    | `object`| Contains [configuration settings](guides/configureLook.md) such as plugins, mixins, userAgent or custom config declarations |

### Output
Every mixin either returns `false` to delete the `property` (which means it was validated as `false`) or a valid `style object` that gets merged with all other styles.
