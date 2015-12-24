# Mixins

Every mixin gets resolved by the [mixin](plugins/Mixin.md) plugin which therefore must be included in the configuration.

* [Pseudo classes](#pseudo-classes)
* [Media queries](#media-queries)
* [Platform queries](#platform-queries)
* [Stateful Conditions](#stateful-conditions)
* [Extract CSS](#extract-css)
* [Extend](#extend)
* [Pseudo to CSS](#pseudo-to-css)

## Pseudo classes
```javascript>
{
	box: {
		color: 'blue',
		':hover': {
			color: 'red'
		}
	}
}
```
Pseudo classes use a common syntax as it would be in CSS. They **always** start with a doublepoint.<br>
Look currently supports **34 pseudo classes**. Some might be added soon. Check the following list for all supported / unsupported.


### Validation
Most pseudo classes get validated within the `render` process, while some need extra event listeners applied which are `:focus`, `:hover`, `:active`, `:valid`, `:invalid`, `:in-range` and `:out-of-range`.

#### Keys and Refs
In order to render multiple elements with those special pseudo classes you need to apply either a `key` or a `ref`. This needs to be done to identify the exact element.
> Note: `:valid`, `:invalid`, `:in-range` and `out-of-range` **always require** a `ref`.

### Supported pseudo classes
##### child-index
* first-child
* last-child
* nth-child*(an+b)*
* nth-last-child*(an+b)*
* only-child

##### type-specific child-index
* first-of-type
* last-of-type
* nth-of-type*(an+b)*
* nth-last-of-type*(an+b)*
* only-of-type

##### other
* empty
* first-letter
* blank

##### custom
* contains(string) - Styles get applied if the element contains the `string`.
* substr(regex) - Used to style only a substr *e.g. `substr([0-9])` would only color numbers.*

### DOM only
##### user-action
* hover
* active
* focus

##### input
* checked
* enabled / disabled
* read-only / read-write
* required / optional
* indeterminate
* valid / invalid
* in-range / out-of-range

##### link
* target

##### other
* before / after
* lang*(language)*

### Unsupported pseudo classes
At least by now the following pseudo classes are yet unsupported. <br>
Note that they might get implemented later.
> **Polyfill**: See the [Pseudo to CSS](#pseudotocsspolyfill) mixin which let's you even use those.

* link
* visited
* not*(Element)*
* dir*(dir)*
* fullscreen
* first-line
* drop
* past
* current
* future
* placeholder-shown
* any-link
* user-error
* nth-column*(an+b)*
* nth-last-column*(an+b)*
* focus-within
* left / right
* root
* scope

## Media Queries
```javascript
{
	box: {
		color: 'blue',
		'@media (min-width: 800px)': {
			color: 'red'
		}
	}
}
```

### Validation
By default Look uses `window.matchMedia` to validate media queries.
### Server-side rendering
> Note: [lookRoot](../FAQ.md#2-global-css-rules) must be set to render these CSS rules

If rendering on the server or `window.matchMedia` is not supported at all, Look will automatically transform media queries to global CSS rules and add them to the global CSS sheet that gets rendered as a `<style></style>`-tag.

## Platform Queries

```javascript
{
	box: {
		fontSize: 20,
		'@platform ios': {
			color: 'blue'
		},
		// You may also use multiple
		'@platform android chrome': {
			color: 'red'
		}
	}
}
```
Platform queries are only supported if a valid userAgent is provided. By default the media query plugin uses the `navigator.userAgent`. You may pass a custom userAgent within the `config` object.

### Validation
Platform queries are based on the browser information provided by every instance of [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) as `prefixer._browserInfo` which is actually detected by [bowser](https://github.com/ded/bowser). You can query any `flag` bowser sets, but there's no guarantee that they get set properly.

#### Bowser flags

##### Engine
* webkit
* gecko

##### Browser
* chrome
* firefox
* msie
* msedge
* opera
* phantom
* safari
* seamonkey
* silk


##### OS
* android
* ios
* mac
* windows
* linux
* chromeos
* bada
* tizen
* sailfish
* webos
* firefoxos

##### Device
* blackberry
* windowsphone
* iphone
* ipad
* ipod
* touchpad

##### Device-Type
* mobile
* tablet


## Stateful Conditions
```javascript
{
	box: {
		color: 'blue',
		'status=active': {
			color: 'red'
		},
		'clicks>=20': {
			color: 'yellow'
		}
	}
}
```

A shortcut to specify state-specific styles.<br>It supports 6 different operators: `>=`, `<=`, `!=`, `=`, `>` and `<`.<br>
This improves readability since you won't need to use expressions like this: `style={[styles.box, this.state.active && styles.active]}`. <br>
It also helps to keep some kind of separation of concerns since you have all your styles compact in one place.

#### Idea
There are several states which are quite common to style a component state-specific. We call such states **style-state** since its only purpose is to validate component styling which is UI-only.
> **Note**: Avoid using stateful conditions with other than style-states since this would destroy semantics.

### Validation
Looks takes `Component.props`, `Component.state` and `Component.context` to check if there is a key that matches the condition. e.g. `status=active` gets validated with `Component.props['status'] === 'active'`.

### Advanced
You can even use dot-notation to adress deeper nested props and state. e.g. `items.name=foo`.

## Extract CSS
```javascript
{
	box: {
		color: 'blue',
		// e.g. if you still want to use bootstrap
		css: 'row col-xs-4'
	}
}
```
Define CSS classes that get additionally added to the Component without having to add those as `className=''` in addition to the look styles.

## Extend
```javascript
const extendStyles = {
	backgroundColor: 'red'
}

{
	box: {
		color: 'blue',
		// single
		extend: extendStyles

		// multiple (array)
		extend: [extendStyles, {fontSize: 20}]
	}
}
```
Lets you extend your styles with other styles. The idea was taken from Sass' `@extend` and works basically all the same.

### Advanced

Extending also supports conditioned extend which is achieved by passing both a `condition` as well a `styles` object.
```javascript
{
	box: {
		color: 'blue',
		extend: {
			// any condition
			condition: true === true,

			// either a single style object or multiple (array)
			styles: extendStyles
		}
	}
}
```
##### ECMAScript 2015 (ES6): Spread operator
If you are already using ECMAScript 2015 which I highly recommend, you do not need the extend-plugin except if you need the conditioned one.
Just use the new spread operator `...`.
```javascript
{
	// preceding to be used as a base
	box: {
		...extendStyles,
		color: 'blue'
	},


	// or subsequent which perhaps overwrites other styles
	container: {
		color: 'blue',
		...etendStyles
	}
}
```

## Pseudo to CSS
> NOTE: This is only a **polyfill** and might be removed if there's a better solution to the problem.

```javascript
import Look, { StyleSheet } from 'react-look'
import { Mixins } from 'react-look/addons'

const Input = () => (
	<div>
		<input look={styles} placeholder='red placeholder'/>
	</div>
)

const styles = StyleSheet.create(Input, {
	color: 'blue',
	'::-webkit-input-placeholder': {
		color: 'red'
	}
})

Input = Look(Input, {
	mixins: {
		'::-webkit-input-placeholder': Mixins.pseudoToCSS
	}
})
```
Some pseudo classes can not be achieved with pure javascript. Such as `placeholder`, `scrollbar` or even `visted` pseudo classes. You can use any valid pseudo class by assigning the `pseudoToCSS`-mixin to the exact key within your configuration.
<br>
Look creates a new glboal CSS rule with the used pseudo class applied and use the [Extract CSS](#extractcss)-mixin to add the `className` to the Component.

> NOTE: Look does not automatically prefix those pseudo classes so in order to color e.g. the placeholder you need to add nothing but `::-webkit-input-placeholder`. Otherwise React will throw an unrecognized style property error.
