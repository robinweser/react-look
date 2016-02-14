# Documentation
> You made it to the documentation! First of all I would like to **thank** you for using Look and pushing it forward. Feel free to star or share if you like it.

The following documentation pages will hopefully solve all your remaining questions and clear out the usage and intention of Look.<br>
If there's still something I forgot please let me know and don't be shy to ask. You may also create an issue so I can update the docs immediately.

As Look is available for both React and React Native there are some differences between those. I used the flags <img src="res/dom-badge.png" height=15 style="margin-top:-2px"> and <img src="res/native-badge.png" height=15 style="margin-top:-2px">  to mark those.
If not marked, it can be used for both.

**The docs reference Version 1.0**.<br>
For legacy documentation please check [this](https://github.com/rofrischmann/react-look/tree/9a7261b16f9a06e8cd7e64773d19714fd4181219).

## Table of contents
1. [Getting Started](GettingStarted.md)
	* 1.1. [Installation](GettingStarted.md#1-installation)
	* 1.2. [First Component](GettingStarted.md#2-first-component)
	* 1.3. [Stateless Components](GettingStarted.md#3-stateless-components)
	* 1.4. [Pseudo classes](GettingStarted.md#4-pseudo-classes) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* 1.5. [Media queries](GettingStarted.md#5-media-queries) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* 1.6. [Mixins & Plugins](GettingStarted.md#6-mixins--plugins)
	* 1.7. [Fallback values](GettingStarted.md#7-fallback-values) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* 1.8. [Vendor prefixes](GettingStarted.md#8-vendor-prefixes) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* 1.9. [Server-side rendering](GettingStarted.md#9-server-side-rendering) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* 1.10. [DevTools](GettingStarted.md#10-devtools)
2. Registry
	* **2.1. [Plugins](Plugins.md)**
		* [Mixin](plugins/Mixin.md)
		* [Stateful Value](plugins/StatefulValue.md)
		* [Fallback Value](plugins/FallbackValue.md) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* [Prefixer](plugins/Prefixer.md) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* **2.1.1 [DevTools](Plugins.md#developertools)**
			* [Friendly ClassName](plugins/FriendlyClassName.md) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
			* [Linter](plugins/Linter.md) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
			* [Style Logger](plugins/StyleLogger.md)
	* **2.2. [Mixins](Mixins.md)**
		* [Contains](Mixins.md#contains)
		* [Extend](Mixins.md#extend)
		* [Extract CSS](Mixins.md#extract-css) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* [Platform queries](Mixins.md#platform-queries) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* [Stateful Conditions](Mixins.md#stateful-conditions)
		* [Substr](Mixins.md#substr)
3. [API Reference](api/)
	* **3.1. [look](api/Look.md)**
	* **3.2. [StyleSheet](api/StyleSheet.md)**
		* [create](api/StyleSheet.md#createstyles)
		* [combineStyles](api/StyleSheet.md#combinestylesstyles)
		* [toCSS](api/StyleSheet.md#tocssstyles--scope) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* [keyframes](api/StyleSheet.md#keyframesframes--name) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
		* [font](api/StyleSheet.md#fontfontfamily-files--properties) <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
	* **3.3. [LookRoot](api/LookRoot.md)**
	* **3.4. [StyleContainer](api/StyleContainer.md)**  <img src="res/dom-badge.png" height=15 style="margin-top:-2px">
4. [Guides](guides/)
	* 4.1. [Upgrading Look](guides/upgradeLook.md)
	* 4.2. [Configuring Look](guides/configureLook.md)
	* 4.3. [Build your own: Mixin](guides/customMixin.md)
	* 4.4. [Build your own: Plugin](guides/customPlugin.md)
5. [FAQ](FAQ.md)
6. Under The Hood *(incomplete)*
	* 6.1. How does Look work?
	* 6.2. How does StyleSheet.create work?
