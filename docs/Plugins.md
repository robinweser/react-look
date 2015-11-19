# Plugins

> **Note**: If you've been using Look before version 0.5 plugins have basically be named 'processors'.

Style modifications of any kind are done using plugins. Plugins are triggered directly before styles get passed to the final element. <br>
Every plugin should only do **one single job**. If there are multiple modifications to do, use multiple plugins.

## Parameters
Every plugin gets called with a set of parameters which include several information to achieve almost any usecase.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| styles | `object` | the full style object provided with the look property |
| scopeArgs   | `object` | - wrapping React `Component`<br> - rendered `element` <br> -  `newProps` to clone the element <br> - `parent` element *(if existing)*  |
| config    | `object`| Contains [configuration settings](guides/configureLook.md) such as plugins, userAgent or custom property declarations |

## [Build-ins](plugins/)
* **[mixin](plugins/Mixin.md)**
<br>Define custom properties using a key-value mapping. <br>
**config key**: `mixins`

* **[alternativeValue](plugins/AlternativeValue.md)**
<br>Use an array of values to define alternatives/fallbacks.<br>
e.g. `flex: ['-webkit-flex', 'flex']`

* **[statefulValue](plugins/StatefulValue.md)**
<br>Use `props`, `state` and `context` values by passing a function instead of a value.<br>
e.g. `color: (props, state, context) => props.color`

* **[prefixer](plugins/Prefixer.md)**
<br>Automatically adds vendor prefixes according your userAgent and caniuse-database.<br>
It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to do this on-the-go using the userAgent information.<br>
**config key**: `userAgent` (optional)
