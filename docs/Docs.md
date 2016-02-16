# Documentation

**The docs reference Version 1.0**.<br>
For legacy documentation please check [this](https://github.com/rofrischmann/react-look/tree/9a7261b16f9a06e8cd7e64773d19714fd4181219).

The following documentation pages will hopefully solve all your remaining questions and clear out the usage and intention of Look.<br>
If there's still something I forgot please let me know and don't be shy to ask. You may also create an issue so I can update the docs immediately.

As Look is available for both React and React Native there are some differences between those. I used the flags <img src="res/dom-badge.png" height=15> and <img src="res/native-badge.png" height=15>  to mark those.
If not marked, it can be used for both.

#### Packages
Note that you need to use different packages for both platforms.<br>
<img src="res/dom-badge.png" height=15> `react-look`<br>
<img src="res/native-badge.png" height=15> `react-look-native`

## Table of contents

1. Registry
	* **1.1. [Plugins](Plugins.md)**
		* [Fallback Value](plugins/FallbackValue.md) <img src="res/dom-badge.png" height=15>
		* [Mixin](plugins/Mixin.md)
		* [Prefixer](plugins/Prefixer.md) <img src="res/dom-badge.png" height=15>
		* [Stateful Value](plugins/StatefulValue.md)
		* **1.1.1 [DevTools](Plugins.md#developertools)**
			* [Friendly ClassName](plugins/FriendlyClassName.md) <img src="res/dom-badge.png" height=15>
			* [Linter](plugins/Linter.md) <img src="res/dom-badge.png" height=15>
			* [Style Logger](plugins/StyleLogger.md)
	* **1.2 [Mixins](Mixins.md)**
		* [Contains](Mixins.md#contains)
		* [Extend](Mixins.md#extend)
		* [Extract CSS](Mixins.md#extract-css) <img src="res/dom-badge.png" height=15>
		* [Platform queries](Mixins.md#platform-queries) <img src="res/dom-badge.png" height=15>
		* [Stateful Conditions](Mixins.md#stateful-conditions)
		* [Substr](Mixins.md#substr)
2. [Guides](guides/)
	* 2.1. [Upgrading Look](guides/upgradeLook.md)
	* 2.2. [Configuring Look](guides/configureLook.md)
	* 2.3. [Build your own: Mixin](guides/customMixin.md)
	* 2.4. [Build your own: Plugin](guides/customPlugin.md)
3. [FAQ](FAQ.md)
4. Under The Hood *(incomplete)*
	* 4.1. How does Look work?
	* 4.2. How does StyleSheet.create work?

<img src="res/dom-badge.png" height=25>

1. [Getting Started](dom/GettingStarted.md)
	* 1.1. [Installation](dom/GettingStarted.md#1-installation)
	* 1.2. [First Component](dom/GettingStarted.md#2-first-component)
	* 1.3. [Stateless Components](dom/GettingStarted.md#3-stateless-components)
	* 1.4. [Pseudo classes](dom/GettingStarted.md#4-pseudo-classes)
	* 1.5. [Media queries](dom/GettingStarted.md#5-media-queries)
	* 1.6. [Mixins & Plugins](dom/GettingStarted.md#6-mixins--plugins)
	* 1.7. [Fallback values](dom/GettingStarted.md#7-fallback-values)
	* 1.8. [Vendor prefixes](dom/GettingStarted.md#8-vendor-prefixes)
	* 1.9. [Server-side rendering](dom/GettingStarted.md#9-server-side-rendering)
	* 1.10. [DevTools](dom/GettingStarted.md#10-devtools)
2. [API Reference](dom/api/)
	* **2.1. [look](dom/api/Look.md)**
	* **2.2. [StyleSheet](dom/api/StyleSheet.md)**
		* [create](dom/api/StyleSheet.md#createstyles)
		* [combineStyles](dom/api/StyleSheet.md#combinestylesstyles)
		* [toCSS](dom/api/StyleSheet.md#tocssstyles--scope)
		* [keyframes](dom/api/StyleSheet.md#keyframesframes--name)
		* [font](dom/api/StyleSheet.md#fontfontfamily-files--properties)
	* **2.3. [LookRoot](dom/api/LookRoot.md)**
	* **2.4. [StyleContainer](dom/api/StyleContainer.md)**

<img src="res/native-badge.png" height=25>

1. [Getting Started](native/GettingStarted.md)
	* 1.1. [Installation](native/GettingStarted.md#1-installation)
	* 1.2. [First Component](native/GettingStarted.md#2-first-component)
	* 1.3. [Stateless Components](native/GettingStarted.md#3-stateless-components)
	* 1.4. [Mixins & Plugins](native/GettingStarted.md#4-mixins--plugins)
	* 1.5. [DevTools](native/GettingStarted.md#5-devtools)
2. [API Reference](native/api/)
	* **2.1. [look](native/api/Look.md)**
	* **2.2. [StyleSheet](native/api/StyleSheet.md)**
		* [create](native/api/StyleSheet.md#createstyles)
		* [combineStyles](native/api/StyleSheet.md#combinestylesstyles)
	* **2.3. [LookRoot](native/api/LookRoot.md)**
