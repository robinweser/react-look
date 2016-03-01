# Plugins

Style modifications of any kind are done using plugins. Plugins are triggered directly before styles get passed to the final element. Every plugin should only do **one single job**. If there are multiple modifications to do, use multiple plugins.


## [Available plugins](plugins/)
| plugin | config | description |
| ------ | ------ | ------ |
| [mixin](plugins/Mixin.md) | `mixins` | Define custom properties using a key-value mapping. |
| [statefulValue](plugins/StatefulValue.md) |  | Use `props`, `state` and `context` values by passing a function instead of a value.  |
| [statefulSelector](plugins/StatefulSelector.md) |  | Create selectors as a function of `props`, `state` and `context`  |
| [fallbackValue](plugins/FallbackValue.md) |  | Use an array of values to define alternatives/fallbacks |
| [prefixer](plugins/Prefixer.md) | `userAgent` | Automatically adds vendor prefixes according your userAgent and caniuse-database.<br> It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to do this on-the-go using the userAgent information. |
| [staticPrefixer](plugins/StaticPrefixer.md) | | Automatically adds all vendor prefixes.<br> It uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to do this on runtime. |

### Developer Tools

Developer Tools *(DevTools)* are designed to help developing applications, simplyfing debugging and to include special tools that even improve your code quality.

DevTools are **special** plugins that are **not** designed to modify your styles. Still they use the same interface and must be included within the plugins array.

| devTool | config | description |
| ------ | ------ | ------ |
| [friendlyClassName](plugins/FriendlyClassName.md) | | Transforms all `className`s into debug-friendly namespaced classNames  |
| [linter](plugins/Linter.md) | `linter` | Lints your styles following defined rules. Logs warnings if rule violations occured. |
| [styleLogger](plugins/StyleLogger.md) | `styleLogger` | Logs styles if configured `events` get triggered. |

> **Warning**: Only use devTools for development!

### Third-party
Right now there are no third-party plugins available. Build one? Feel free to add it here *(via pull-request)*.

> You need a plugin that is not listed? [Create your own!](./guides/customPlugin.md)
