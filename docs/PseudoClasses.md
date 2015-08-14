<div style="float:left"><a href="UnderTheHood.md">< <b>2. Under the hood</b></a></div>
<div style="float:right"><a href="MediaQueries.md"><b>4. Media queries</b> ></a></div>

# 3. Pseudo classes

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

Look currently supports **25 pseudo classes**. Some might be added soon. Check the following list for all supported / unsupported.

##Validation
Most pseudo classes get validated within the `render` process, while some need extra event listeners applied. Those are `:focus`, `:hover` and `:active`.

## Supported pseudo classes
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
* before / after *(: or ::)*
* lang*(language)*
* empty

## Deprecated 
Some pseudos have also been part of Look formerly, but got deprecated due to overhead. They can be achieved using [Look Tools](https://github.com/rofrischmann/react-look-tools) though.
* valid / invalid
* in-range / out-of-range

## Unsupported pseudo classes
At least by now the following pseudo classes are yet unsupported. <br>
Note that they might get implemeneted later.

* link
* visited
* target
* not*(Element)*
* dir*(dir)*
* fullscreen
* left / right *(print only)*
* root
* scope
* first-letter
* first-line
* selection
* drop
* past 
* current 
* future 
* placeholder-shown 
* any-link
* user-error
* blank
* nth-column*(an+b)*
* nth-last-column*(an+b)*
* focus-within


