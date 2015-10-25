# Pseudo classes

Look supports pseudo classes using a common syntax as it would be in CSS. They **need to be nested** within a valid selector and **always** start with a doublepoint.

## Example
```javascript
{
	box : {
		color: 'blue',
		fontSize: 20,
		background: '#fff',
		':hover' : {
			color: 'red',
			background: 'gray'
		}
	}
}
```
Pseudo-classes can be nested multiple to achieve something like `:focus:hover`. They can also contain nested media queries and stateful conditions.

Look currently supports **30 pseudo classes**. Some might be added soon. Check the following list for all supported / unsupported.

## Validation
Most pseudo classes get validated within the `render` process, while some need extra event listeners applied. Those are `:focus`, `:hover` and `:active`.

## Supported pseudo classes
### child-index
* first-child
* last-child
* nth-child*(an+b)*
* nth-last-child*(an+b)*
* only-child

### type-specific child-index
* first-of-type
* last-of-type
* nth-of-type*(an+b)*
* nth-last-of-type*(an+b)*
* only-of-type

### other
* empty
* first-letter
* contains(string)
* substr(regex without surrounding slashes)
* blank

## `react-look/dom`-only
### user-action
* hover
* active
* focus

### input
* checked
* enabled / disabled
* read-only / read-write
* required / optional
* indeterminate

### link
* target

### other
* before / after *(: or ::)*
* lang*(language)*

## Unsupported pseudo classes
At least by now the following pseudo classes are yet unsupported. <br>
Note that they might get implemented later.

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


### Print-only
Those pseudo classes will barely be supported at anytime.

* left / right
* root
* scope
