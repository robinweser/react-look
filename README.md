![Obscene Logo](https://raw.githubusercontent.com/obscene/obscene.github.io/master/res/obscene.png)
**Obscene Stylesheet** is a lightweight styling library built for use with [React.js](https://facebook.github.io/react/) but also works fine without.       
It lets you handle all your styling just directly within your Components and acts as some kind of preprocessor in the background as it generates valid & minified CSS code as well as inline styles.

# Disclamer
> Inspired by [Cristopher Chedeau (@vjeux)](https://twitter.com/vjeux)'s presentation [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) with the idea of putting styling completely into javascript, So I started building my own library to achieve that. At first I was overwhelmed by how much I can achieve with just plain javascript. Such as media queries and `mouseover`-state were no problem at all. But while I started adding more and more there came a point where it was no longer acceptable to go with only inline styles and EventListeners javascript and I had to rethink all of my work anew.    
This is where I found about [Pete Hunt](https://twitter.com/floydophone)'s Approach with [jsxstyles](https://github.com/petehunt/jsxstyle) and I thought it would be create to have some kind of JS to CSS compiler.    

# About
Using both compiled CSS as well as inline styles combines CSS and JavaScript to a powerful tool that capable of almost anything.  

### In a nutshell
* CSS and inline styles logically combined
* modern (ES6)
* no mixins/wrappers
* pseudo-classes
* nested pseudo-classes
* media queries
* processors (prefixing, flexbox support, ...)
* conditioned styles
* dynamic style manipulation
* theming


### Dynamic Style Sheets 
Under the hood it is based on **[Dynamic Style Sheets](https://github.com/dynamicstylesheets)** which is an awesome interface working with style sheets since it does all the background stuff including diffing and DOM manipulation bringing as much performance as possible.     
*(Check the organisation for more information)*.
     ˘
#### Processors
DSS (Dynamic Style Sheets) is **hackable** and allows processors e.g. [Vendor Prefixing](https://github.com/dynamicstylesheets/DSS-Prefixer) modifying its selectors. Using those you can do what ever you want with your styles object before it gets applied. You may use processors with any object as every processor must at least have a `.process()`-method, but it's recommended to [register](#settings) them and use them directly with `sheet.process()`.    
*(For further information on how to use processors please check the DSS repository)*

### Universal Style Sheets
Since DSS is primary made for static style sheets (CSS) we had to extend it to support a more **universal** and **abstract** approach which we call Universal Style Sheets.    
Those combine CSS and inline styles *(via [InlineSheet](#stylesheetcreateinlinestyles-autoprocess))* and allow **pseudo-classes, media queries** and **stateful conditions**. 

# Usage
> Warning: This is still in construction and some things might change 
 
```sh
npm install obscene-stylesheet -save
```


## Create new universal Sheet
### `Stylesheet.create(styles [,options])`

| option      | default    | description                                |
|-------------|------------|---------------------------------------------|
| minify      | `true`     | minified CSS                                |
| unit        | `px`       | applied unit                                |
| autoApply   | `false`    | automatically apply CSS to DOM              |
| autoProcess | `false`    | automatically [process](#processors) styles |

```javascript
import Stylesheet from 'obscene-stylesheet';

function custom(value){
  return value * 2 + 10
}

let sheet = Stylesheet.create({
	header : {
		padding: custom(5),               // use benefit of javascript
		fontSize: 20,                     // gets `options.unit` added 
    	color: '#fff',
    	transition: '200ms all linear',
		':hover' : {                      // pseudo-classes
			fontSize: 15,
      		':checked' : {                // also nested
  				color: 'red'
			},
    	},
    	'@media (min-height: 800px)' : {  // media queries
    		fontSize: 13
    	},
    
    	'status=active' : {               // conditioned styles
      		backgroundColor: 'green'
    	},
    	'status=disabled' : {
    		backgroundColor: 'gray'
    	}
	},
  
	title : {
		fontWeight: 800
	}
})
```
This now creates a new universal Sheet including 2 CSS classes (header & title) as well as 2 inline style conditions (status=active & status = warning).    
Use `sheet.process()` and `sheet.apply()` to go on.
> **Note**: Once applied you need to use `sheet.update()` if you want to apply changes later on.

## Component
```javascript
import React from 'react';

let classes = sheet.classes;

export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		let state = this.state.status;
		this.setState({
			status: (state == 'active' ? 'disabled' : 'active')
		})
	}
	render() {
		let styles = sheet.matchCondition(this.state);

		return (
			<div className={classes.header} onClick={this.onClick} style={styles.header}>
				<h1 className={classes.title}>{this.props.title}</h1>
			</div>
		)
	}
}
```

#### `sheet.classes`
Contains all references to your minified CSS classes. 
e.g. `{header: '.c0', title: '.c1'}`


#### `sheet.matchCondition(obj)`
Evaluates fulfilled conditions using values in `obj`. Made especially for use with `props` and `state`. 
e.g. if state.status == active.    
 `{box : {backgroundColor: green}}`

### `Stylesheet.createInline(styles [,autoProcess})`
| option      | default    | description                                |
|-------------|------------|---------------------------------------------|
| autoProcess | `false`    | automatically [process](#processors) styles |
Creates a new `InlineSheet`. You can use `.process()` to do your usual processing as well, but there's no `.apply()` since you can not apply inline styles to the DOM. Use `.getSelectors()` to get your blank styles object.     

> **Note**: Even if I don't recommend using this you might sometimes be just happy using direct inline styles e.g. if you're sure there's no pseudo-class, media-query or if you need to create a sheet based on `props`-values, but want to use processors without additional effort. 

## Settings
You probably will use the same options/processors in every component. That's why you can set your global options and register processors.

#### `Stylesheet.setOptions(opts)`
Sets global options and uses defaults for unset values.

#### `Stylesheet.registerProcessor(processors)`
Registers all `processors` which can either be a single one or an array of processors.    
A list of avaible processors can be found here [Dynamic Style Sheets](https://github.com/dynamicstylesheets).
Most common are [Prefixer](https://github.com/dynamicstylesheets/DSS-Prefixer) and [Flexbox](https://github.com/dynamicstylesheets/DSS-Flexbox).

```javascript
import Prefixer from 'dss-prefixer';
import Flexbox from 'dss-flexbox';

Stylesheet.registerProcessor([Prefixer, Flexbox]);
Stylesheet.setOptions({autoProcess: true});
```

#Roadmap
- [ ] documentation
- [ ] nested media queries
- [ ] examples
- [ ] `@keyframe` support
- [ ] additional processors (devTools)
- [ ] GlobalSheet for global styles

# License
Obscene including Obscene Stylesheet is licensed under the [MIT License](http://opensource.org/licenses/MIT).    
Created with &hearts; by [@rofrischmann](http://rofrischmann.de) at [Unverschämt](http://unverschaemt.net).

# Contributing
Feel free to contribute.
