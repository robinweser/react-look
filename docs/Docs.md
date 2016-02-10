# Documentation
> You made it to the documentation! First of all I would like to **thank** you for using Look and pushing it forward. Feel free to star or share if you like it.

The following documentation pages will hopefully solve all your remaining questions and clear out the usage and intention of Look.<br>
If there's still something I forgot please let me know and don't be shy to ask. You may also create an issue so I can update the docs immediately.

**The docs reference Version 1.0**.<br>
For legacy documentation please check [this](https://github.com/rofrischmann/react-look/tree/9a7261b16f9a06e8cd7e64773d19714fd4181219).

## Table of contents
1. [Getting Started](GettingStarted.md)
	* 1.1. [Installation](GettingStarted.md#1-installation)
	* 1.2. [First Component](GettingStarted.md#2-first-component)
	* 1.3. [Stateless Components](GettingStarted.md#3-stateless-components)
	* 1.4. [Pseudo classes](GettingStarted.md#4-pseudo-classes)
	* 1.5. [Media queries](GettingStarted.md#5-media-queries)
	* 1.6. [Mixins & Plugins](GettingStarted.md#6-mixins--plugins)
	* 1.7. [Fallback values](GettingStarted.md#7-fallback-values)
	* 1.8. [Vendor prefixes](GettingStarted.md#8-vendor-prefixes)
	* 1.9. [Server-side rendering](GettingStarted.md#9-server-side-rendering)
	* 1.10. [DevTools](GettingStarted.md#10-devtools)
2. Registry
	* **2.1. [Plugins](Plugins.md)**
		* [Mixin](plugins/Mixin.md)
		* [Fallback Value](plugins/FallbackValue.md)
		* [Stateful Value](plugins/StatefulValue.md)
		* [Prefixer](plugins/Prefixer.md)
		* **2.1.1 [DevTools](Plugins.md#developertools)**
			* [Friendly ClassName](plugins/FriendlyClassName.md)
			* [Linter](plugins/Linter.md)
			* [Style Logger](plugins/StyleLogger.md)
	* **2.2. [Mixins](Mixins.md)**
		* [Contains](Mixins.md#contains)
		* [Extend](Mixins.md#extend)
		* [Extract CSS](Mixins.md#extract-css)
		* [Platform queries](Mixins.md#platform-queries)
		* [Stateful Conditions](Mixins.md#stateful-conditions)
		* [Substr](Mixins.md#substr)
3. [API Reference](api/)
	* **3.1. [look](api/look.md)**
	* **3.2. [StyleSheet](api/StyleSheet.md)**
		* [create](api/StyleSheet.md#createstyles)
		* [combineStyles](api/StyleSheet.md#combinestylesstyles)
		* [toCSS](api/StyleSheet.md#tocssstyles--scope)
		* [keyframes](api/StyleSheet.md#keyframesframes--name)
		* [font](api/StyleSheet.md#fontfontfamily-files--properties)
	* **3.3. [LookRoot](api/LookRoot.md)**
	* **3.4. [StyleContainer](api/StyleContainer.md)**
4. [Guides](guides/)
	* 4.1. [Upgrading Look](guides/upgradeLook.md)
	* 4.2. [Configuring Look](guides/configureLook.md)
	* 4.3. [Build your own: Mixin](guides/customMixin.md)
	* 4.4. [Build your own: Plugin](guides/customPlugin.md)
5. [FAQ](FAQ.md)
6. Under The Hood *(incomplete)*
	* 6.1. How does Look work?
	* 6.2. How does StyleSheet.create work?
