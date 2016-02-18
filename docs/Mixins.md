# Mixins

Every mixin gets resolved by the [mixin](plugins/Mixin.md) plugin which therefore must be included in the configuration.

* [Before / After](#before-after) <img src="res/native-badge.png" height=15>
* [Blank](#blank) <img src="res/native-badge.png" height=15>
* [Contains](#contains)
* [Empty](#empty) <img src="res/native-badge.png" height=15>
* [Extend](#extend)
* [Extract CSS](#extract-css) <img src="res/dom-badge.png" height=15>
* [First Letter](#first-letter ) <img src="res/native-badge.png" height=15>
* [Platform Queries](#platform-queries) <img src="res/dom-badge.png" height=15>
* [Stateful Conditions](#stateful-conditions)
* [Substr](#substr)

## Before / After <img src="res/native-badge.png" height=20>
```javascript
{
  box: {
    fontSize: 20,
    before: {
      content: 'I appear before'
    },
    after: {
      // This text will also appear in red
      content: 'I appear after'
    }
  }
}
```
Behaves basically just like `:before` & `:after` pseudo classes from CSS. Let's you add content before / after the applied element.

## Blank <img src="res/native-badge.png" height=20>
```javascript
{
  box: {
    fontSize: 20,
    blank: {
      // Adds padding if the element is empty or includes whitespace
      padding: 20
    }
  }
}
```
Behaves like the `:blank` pseudo class known from CSS. Works as [Empty](#empty), but also adds styles if the element contains whitespaces.

## Contains
```javascript
{
	box: {
		fontSize: 20,
		// only resolves if element is a string
		// and contains at least one number
		'contains([0-9])': {
			color: 'blue'
		}
	}
}
```
Contains let's you check wether a primitive element *(string or number)* contains a given regex.

## Empty <img src="res/native-badge.png" height=20>
```javascript
{
  box: {
    fontSize: 20,
    empty: {
      // Adds padding if the element is empty (no children)
      padding: 20
    }
  }
}
```
Behaves like the `:empty` pseudo class known from CSS. Only adds styles if the element is empty / got no children.

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

## Extract CSS <img src="res/dom-badge.png" height=20>
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

## First Letter <img src="res/native-badge.png" height=20>
```javascript
{
  box: {
    fontSize: 20,
    firstLetter: {
      // Colors the first letter red
      color: 'red'
    }
  }
}
```
Behaves like the `:first-letter` pseudo class known from CSS. Will only style the first letter of an element's child. Only works on `string` and `number`.

## Platform Queries <img src="res/dom-badge.png" height=20>

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
It takes `Component.props`, `Component.state` and `Component.context` to check if there is a key that matches the condition. e.g. `status=active` gets validated with `Component.props['status'] === 'active'`.

### Advanced
You can even use dot-notation to adress deeper nested props and state. e.g. `items.name=foo`.

## Substr
```javascript
{
	box: {
		fontSize: 20,
		// colors every number blue
		'substr([0-9])': {
			color: 'blue'
		}
	}
}
```
Substr it similar to contains as it only works on primitive elements *(string and number)* and takes a regex as parameter.<br>
It let's you style substrings without splitting the element yourself at all.
