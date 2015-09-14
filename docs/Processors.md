<div style="float:left"><a href="StatefulConditions.md">< <b>5. Stateful conditions</b></a></div>
<div style="float:right"><a href="Mixins.md"><b>7. Mixins</b> ></a></div>

# 6. Processors

Put simply, a processor is just a function. It takes in an object, does some transformation and outputs an object. Each processor should only accomplish **one single job** e.g. adding vendor prefixes.

## Background
Processors also are nothing new. They're widely used by Frontend-Developers all over the world. We are just bringing them to JavaScript directly, so you won't need to add yet another annoying build step.

Using processors you will likely improve your workflow multiple times since you don't have to handle every versatile browser incompatibility or issue.

## Usage
You may pass processors to a Component directly just by adding a property to your class. <br>
If you're using a processor multiple times you may also register it as a global processor using `Look.Config.registerProcessor(processor)`.<br>
They may also be added within the wrapper using `Look(Component, {}, processors)`
	
### Arguments
Look passes 4 special arguments which can be used within your `process`-method. Those are:
* **Component**: Current wrapping React Component
* **element**: Current element that gets resolved
* **newProps**: Properties used to clone the Component (including old `element.props`)
* **childIndexMap** Information on `element`'s index within its parent node

### Custom Processors
Every processor is an Object with at least a `process`-method.
> **Note**: For maximal developer experience it is recommended to add `name`, `version` and `description` as well. Check out Mixins or Prefixer in the source directory for an example.

```javascript
export default {
	name: 'My-Processor',
	version: '1.0.0', // best if you start with 1.0.0
	description: 'My-Processor does something.',
	
	// Main method
	// => args = {Component, element, neProps, childIndexMap}
	process(styleObject, args) {
		/* do something with styleObject */
		return styleObject 
	}
	
	// ... probably add some other useful methods 
	// that might be accessed public
}
``` 
