# Mixins

Every mixin gets resolved by the [mixin](plugins/Mixin.md) plugin which therefore must be included in the configuration.

* [Platform queries](#platform-queries)
* [Stateful Conditions](#stateful-conditions)
* [Extract CSS](#extract-css)
* [Extend](#extend)

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
