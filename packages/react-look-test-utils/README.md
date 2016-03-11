<p align="center"><img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/res/logo.png" width=320></p>
<p align="center">
Test Utilities for react-look.
<br>

<img alt="npm version" src="https://badge.fury.io/js/react-look-test-utils.svg">
<img alt="react version" src="https://img.shields.io/badge/react--look-%5E1.0.0--beta7-brightgreen.svg">
</p>
<p align="center">
Not compatible with <a href="../react-look-native/">react-look-native</a> (for now).
</p>

### Disclaimer
Before using the test utils, please note that all methods only include Look-specific classNames. They do not return third-party or global classNames.
For such use-case you might want to use  [window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

# API
### Methods
* [getStaticStyle](#getstaticstyleelement)
* [getDynamicStyle](#getdynamicstyleelement)
* [getElementStyle](#getelementstyleelement)
* [getResolvedStyle](#getresolvedstyleelement-component-config)

## `getStaticStyle(element)`
Returns an object containing all static CSS styles applied to an `element`. Also includes media queries.

## `getDynamicStyle(element)`
Returns an object containing all dynamic styles applied to an `element` referenced by classNames.
> **Warning**: They do not get resolved but remain as defined within `StyleSheet.create`.

## `getElementStyle(element)`
Combines both `getStaticStyle` and `getDynamicStyle`.

## `getResolvedStyle(element, Component, config)`
Returns an object containing all resolved styles as they'd be applied within a real application. In order to get correct output, you need to pass the right `Component` and your whole Look `config`.

#### Global instance
You most likely want to use the same Look config all the time. For this case you might want add a global custom instance of `getResolvedStyle`.

```javascript
import { getResolvedStyle } from 'react-look-test-utils'
import { Presets } from 'react-look'

global.getLookStyle = (element, Component) => {
  return getResolvedStyle(element, Component, Presets['react-dom'])
}
```
Now add `--require path/to/your/test-setup.js` to your mocha options (optionally create a `mocha.opts` file).


# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
