# Plugins 

> **Note**: If you've been using Look before version 0.5 plugins have basically be named 'processors'.

Style modifications of any kind are done using plugins. Plugins are triggered directly before styles get passed to the final element. <br>
Every plugin should only do **one single job**. If there are multiple modifications to do, use multiple plugins.

## Parameters
Every plugin gets called with a set of parameters which include several information to achieve almost any usecase.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| styles | `object` | the full style object provided with the look property |
| scopeArgs   | `object` | - wrapping React `Component`<br> - rendered `element` <br> - new `props` to clone the element <br> - `parent` element *(if existing)*  |
| config    | `object`| Contains [configuration settings](guides/configureLook.md) such as plugins, userAgent or custom property declarations |

## Build-ins
* **customProperty**
<br>Define custom properties using a key-value mapping. <br>
**config key**: `customProperty`

* **alternativeValue**
<br>Use an array of values to define alternatives/fallbacks.<br>
e.g. `flex: [-webkit-flex, flex]`

* **statefulValue**
<br>Use `props` and `state` values by passing a function instead of a value.<br>
e.g. `color: (props, state) => props.color`

* **prefixer**
<br>Automatically adds vendor prefixes according your userAgent and caniuse-database.<br>
**config key**: `userAgent` (optional)
