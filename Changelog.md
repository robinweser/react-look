# Changelog

## 1.0
### 1.0.0-beta2 (15.02.16)
#### Packages
Look was split into 2 different packages as it now fully supports React Native again.
* **react-look**<br>
Used for web Component styling with `react-dom`
* **react-look-native**<br>
Used for native Component styling with `react-native`

##### Bux fixes
* Fixed `friendlyClassName` to also transform custom Components


### 1.0.0-beta1 (10.02.16)

#### API Changes
While those changes might seem huge, it still is quite easy to update.
* Uses `className` instead of `look`
* Use [`StyleSheet.combineStyles`](docs/api/StyleSheet.md#combinestylesstyles) instead of an array passed
* `StyleSheet.create` only accepts styles, no Component anymore
* Uses [`<LookRoot>`](docs/api/LookRoot.md)-Component in favor of `lookRoot: true`
* Pass config with `<LookRoot config={config}>` instead of `lookConfig` on root-Component
* Everything shipped with `react-look/addons` comes with `react-look` directly

##### Improvements
* Huge performance improvements
* Now supports **every** pseudo class
* LVHA-aware pseudo classes
* Less bandwidth for server-side rendering
* Improved debugging with [friendlyClassName](docs/plugins/friendlyClassName.md)-plugin
* New documentation & [Getting Started](docs/GettingStarted.md) guide
* Now using [lodash](lodash.com) utility methods

##### Bug fixes
* Third-party `context` gets passed correctly ( [#190](https://github.com/rofrischmann/react-look/issues/190) )
* Fixed plugin resolving ( [#185](https://github.com/rofrischmann/react-look/issues/185) )
* Fixed `@font-face` rendering bug
* Fixed a bug that prevented mixins to resolve correctly

------
## 0.7
### 0.7.2 (12.01.16)
* added support for hot module replacement
* fixed a bug that prevents nested stateful values to resolve correctly
* upgraded devTools (docs soon)

#### 0.7.1 (01.01.16)
##### Breaking
* added a linter plugin based on [inline-style-linter](https://github.com/rofrischmann/inline-style-linter)

##### Improvements
* fixed a bug that prevents children to render ( [#159](https://github.com/rofrischmann/react-look/issues/159) )
* fixed a bug that caused dynamically generated custom `style`-props to render wrong ( [#160](https://github.com/rofrischmann/react-look/issues/160) )
* now using [style-transform](https://github.com/rofrischmann/style-transform) to perform object-to-CSS transformations
* initial server-side media query now use a `!important`-flag to overwrite inline styles

### 0.7.0 (03.12.15)
##### Breaking
- server-side rendering support
- new package structure with configuration presets

##### Improvements
- updated [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer/blob/master/Changelog.md#054-031215) to 0.5.4
- `:valid`, `:invalid`, `:in-range` and `:out-of-range` pseudo classes
- Switched to [Webpack](https://webpack.github.io) for the demo
- Updated to [Babel 6](https://babeljs.io)
- configuration can now be passed as a prop named `lookConfig`

## 0.6
### 0.6.2 Hotfix (25.11.15)
- updated [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to 0.5.2
- fixed a bug when resolving stateful styles
- pass a custom `<style></style>` DOMElement within your Look config as a global StyleSheet if doing server-side rendering

### 0.6.1 (24.11.15)
- platform queries now allow multiple platforms e.g. `@platform ios android`

### 0.6.0 (19.11.15)
##### Breaking Changes
- [platform queries](docs/Mixins.md#platformqueries) `@platform`
- [keyframes API](docs/api/StyleSheet.md) `StyleSheet.keyframes`
- [font-face API](docs/api/StyleSheet.md) `StyleSheet.fontFace`

##### Improvements
- Huge documentation refactoring
- Renamed `customProperty` to `mixin`
- updated [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer)
- [stateful styles](docs/StatefulCondition.md) now support `context` as third parameter
- [Polyfill](docs/plugins/Mixin.md#pseudotocss) to support any CSS pseudo class by adding a global CSSRule


## 0.5
#### 0.5.2 (07.11.15)
- Fixed nested plugin resolving
- Fixed [media query](docs/Mixins.md#mediaqueries) automatic rerendering
- Added new [pseudo classes](docs/Mixins.md#pseudoclasses) (`:target`, `:first-letter`, `:contains`, `:substr`, `:blank`)
- Units are automatically added when using `StyleSheet.toCSS`
- `StyleSheet.create`'s scope can now also be as string. Add `styleScope: /* stringScope */` to your config.
- The **config** object can now be composed as it assigns directly.

### 0.5.1 (21.10.15)
- Small bugfix that prevented `:focus` to work.

### 0.5.0 (19.10.15)
##### Breaking
- all new **plugin** system
- **scoped** styles and performant style resolving

##### Improvements
- stateless wrapper by passing a **config** object

## old versions
Actually a lot of fast development happened in the beginning which is why there was no changelog at all.
