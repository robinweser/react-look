# Changelog

## 0.6
### 0.6.0 (19.11.15)
- Huge documentation refactoring
- Renamed `customProperty` to `mixin`
- [platform queries](docs/Mixins.md#platformqueries) `@platform`
- [keyframes API](docs/api/StyleSheet.md) `StyleSheet.keyframes`
- [font-face API](docs/api/StyleSheet.md) `StyleSheet.fontFace`
- updated [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer)
- [stateful styles](docs/StatefulCondition.md) now support `context` as third parameter
- [Polyfill](docs/plugins/Mixin.md#pseudotocss) to support any CSS pseudo class by adding a global CSSRule


## 0.5
### 0.5.2 (07.11.15)
- Fixed nested plugin resolving
- Fixed [media query](docs/Mixins.md#mediaqueries) automatic rerendering
- Added new [pseudo classes](docs/Mixins.md#pseudoclasses) (`:target`, `:first-letter`, `:contains`, `:substr`, `:blank`)
- Units are automatically added when using `StyleSheet.toCSS`
- `StyleSheet.create`'s scope can now also be as string. Add `styleScope: /* stringScope */` to your config.
- The **config** object can now be composed as it assigns directly.

### 0.5.1 (21.10.15)
- Small bugfix that prevented `:focus` to work.

### 0.5.0 (19.10.15)
- stateless wrapper by passing a **config** object
- all new **plugin** system
- **scoped** styles and performant style resolving

## old versions
Actually a lot of fast development happened in the beginning which is why there was no changelog at all.
