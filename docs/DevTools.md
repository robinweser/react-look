# Developer Tools

Developer Tools *(DevTools)* are designed to help developing applications, simplyfing debugging and to include special tools that even improve your code quality.

DevTools are **special** plugins that are **not** designed to modify your styles. Still they use the same interface and must be included within the plugins array.

> **Warning**: Only use devTools for development!

## [Available developer tools](devTools/)
| plugin | config | description |
| ------ | ------ | ------ |
| [linter](plugins/Linter.md)| `linter` | Lints your styles following defined rules. Logs warnings if rule violations occured. |
| [styleLogger](plugins/StyleLogger.md) | `styleLogger` | Logs styles if configured `events` get triggered. |
