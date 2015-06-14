![Obscene Logo](https://raw.githubusercontent.com/obscene/obscene.github.io/master/res/obscene.png)
**Obscene Stylesheet** is a lightweight styling library built for use with [React.js](https://facebook.github.io/react/) but also works fine without.       
It lets you handle all your styling just directly within your javascript and acts as some kind of preprocessor in the background as it generates valid & minified CSS code.

> Note: Obscene Stylesheet is a core library & former part of [Obscene Layout](http://github.com/obscene/Obscene-Layout) which now remains *only* as a set of layouting components

## About
Inspired by [Cristopher Chedeau (@vjeux)](https://twitter.com/vjeux)'s presentation [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) with the idea of putting styling completely into javascript, So I started building my own library to achieve that. At first I was overwhelmed by how much I can achieve with just plain javascript. Such as media queries and `mouseover`-state were no problem at all. But while I started adding more and more there came a point where it was no longer acceptable to go with only inline styles and EventListeners javascript and I had to rethink all of my work anew.    
This is where I found about [Pete Hunt](https://twitter.com/floydophone)'s Approach with [jsxstyles](https://github.com/petehunt/jsxstyle) and I thought it would be create to have some kind of JS to CSS compiler.    


## Roadmap for 1.0
- [x] automated vendor-prefixing
- [x] merging styles
- [x] global styles
- [x] minifying
- [x] debugMode & DebugHelper
- [x] :pseudo-classes such as `:hover`, `:focus`, `:active` or `:checked`
- [x] nested :pseudo-classes
- [x] user options to keep it flexible
- [ ] extending
- [ ] flexbox support (also old specs)
- [ ] media queries

## Usage
> Warning: Do not use this in production. It is still at its beginning

Install via `npm`. Use `-save` if you'd like to add it to your *package.json*.    
```sh
npm install obscene-stylesheet
```


Now you can *require* it within your code.    
```javascript
var Stylesheet = require('obscene-stylesheet');
```

## Stylesheet.create(styles *[, options]*)
Use this function to define your styles.    
You don't need to worry about vendor prefixing. Obscene-Stylesheet adds exactly those needed. 
This is much like you would define a stylesheet in [React Native](https://facebook.github.io/react-native/) too. e.g.    

```javascript
var styles = Stylesheet.create({
	header : {
		color: '#fff',
		padding: 20,
		fontSize : 12,
		color: 'black',
		fontSize: 20,
		':hover' : {
			fontSize: 15
		},
		':checked' : {
			color: 'red',
			':hover' : {
				color: 'blue'
			}
		}
	},
	box : {
		boxSizing: 'border-box',
		backgroundColor : 'blue'
	}
});
```

It now generates a minified string of CSS selectors and applies them to your page. By calling your styles you will get the minified selector as reference.
e.g. `styles.header` would output 'c0' and `styles.box` would be `c1`.      
Your generated CSS would look like this (but minified)
```CSS
.c0 {
    color: black;
    padding: 20px;
    font-size: 20px
}
.c0:hover {
    font-size: 15px
}
.c0:checked {
    color: red
}
.c0:checked:hover {
    color: blue
}
.c1 {
    box-sizing: border-box;
    background-color: blue
}
```

> Note: If you need to access your CSS output manually you can get it with Stylesheet.output after you've created one with Stylesheet.create

### options
//userAgent, vendorPrefix, unit, debugMode, selectorPrefix, autoApply, counter
There is a set of options which should help you to customize the stylesheet generation process to your needs.

#### `userAgent`
*default: navigator.userAgent*
Set a specific userAgent instead of the browsers one.    
This can be useful for server-side rendering.

#### `vendorPrefix`
Set a specific vendorPrefix instead of the automatically identified.
Valid values are `moz`, `webkit`, `ms` and `o`.

#### unit
*default: 'px'*
Set a unit you'd like to be automatically added to properties that require one.
Valid values are 'px', 'pt', 'pc', 'mm', 'in', 'cm', 'em', 'rem', 'ex', 'vh', 'vw' and '%'.
> Beware browser support issues with some of these values

#### debugMode
*default: false*
Set `true` if you'd like to have none minified class selectors and some helpful browser logs.

#### selectorPrefix
Set a string which acts as a prefix to all generated selectors. e.g. `selectorPrefix = .MyComponent-`     
Your generated CSS would look like this    
```CSS
.MyComponent-c0 {
    color: black;
}
.MyComponent-c0:hover {
    font-size: 15px
}
.MyComponent-c1 {
	padding: 10px
}
```

### autoApply
*default: true*
Set to `false` if you don't want to apply your CSS instantly.
> Beware that you will need to add it later to get it working. To do so use `Stylesheet.apply()` 

### counter
*default: 0*
A counter is used to generated minified selectors.     
Set this value to use your own e.g. if you are using a global counter for all your Stylesheets.


## Knowledge Source
Information according the need of vendor prefixes were taken from [Richard Bradshaw's Guide](http://css3.bradshawenterprises.com/which-vendor-prefixes-are-needed/) and [CanIUse](http://caniuse.com/).    
For further information about Flexbox check [Flexbox.md](Flexbox.md).    
This implementation is based on [Flexy Boxes](http://the-echoplex.net/flexyboxes/) according browser support and vendor prefixes.      
Default values were taken from [Guide to Flexbox  (css-tricks.com)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).    
It automatically transforms properties to older specs properties such as `msFlexAlign` or `display: -webkit-box` if needed.

> **Warning**: If you've never used flexbox before please be sure to check both links above to properly understand it.

## Repositories
* [[React] Obscene Layout (set of useful layout components)](https://github.com/unverschaemt/Obscene)
* [[React] Obscene (full-featured, responsive UI library)](https://github.com/unverschaemt/Obscene)
* [[Sass] Obscene UI (Template for custom app themes)](http://unverschaemt.github.io/Obscene-UI)
* [[Sass] Obscene Core (layouting & uselful classes / mixins based on flexbox)](https://github.com/unverschaemt/Obscene-Core)

## License
Obscene including all repositories listed above is licensed under the [MIT License](http://opensource.org/licenses/MIT).    
Created with &hearts; by [@rofrischmann](http://rofrischmann.de) at [Unverschämt](http://unverschaemt.net).

## Contributing
Feel free to contribute.
