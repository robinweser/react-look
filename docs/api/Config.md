<div style="float:left"><a href="State.md">< <b>3. State</b></a></div>

# 4. Config
Look provides a Config API that lets you register/deregister processors & mixins for global use as well as replace the default matchMedia function which is `window.matchMedia`. 

## Methods
matchMedia
- [setMatchMedia](#setmatchmediamatchmediafn)
- [getMatchMedia](#getmatchmedia)
- [canMatchMedia](#canmatchmedia)

Processors & Mixins
- [register](#register)
- [deregister](#deregister)
- [get](#get)
- [getAll](#getall) 

## Usage
```javascript
import {Config} from 'react-look';
import Prefixer from 'dss-prefixer';

let rotateFn = (options) => {
	return {transform: 'rotate(' + options.deg + ')'}
}

let matchMediaFn = () => {
    /* matchMedia function here */
}

//matchMedia
Config.setMatchMedia(matchMediaFn);
Config.canMatchmedia() // => true
Config.getMatchMedia() // => matchMediaFn

//Processors
Config.registerProcessor(Prefixer);
Config.getProcessors()           // => {Prefixer => []}
Config.deregisterProcessor()     // => {}

//Mixins
Config.registerMixin('rotate', rotateFn);
Config.getMixinFn('rotate') 	 // => rotateFn
Config.getMixins()			   // => {'rotate' => rotateFn}
Config.deregisterMixin('rotate') // => {}
```

# matchMedia
You may want to replace the currently used matchMedia-method. THis is mostly used for server-side rendering (where there is no `window.matchMedia`) or to support older browser such as IE 8.

### `setMatchMedia(fn)`
Replaces the default matchMedia function with a custom `fn`. 

### `getMatchMedia()`
Returns the currently used matchMedia function.

### `canMatchMedia()`
Returns if the executing environment is capable of executing `window.matchMedia`. 

# Processors & Mixins
You may register processors & mixins to autoenable them globally. They get called/resolved every time you are extending a Component with Look.

## register
### `registerProcessor(processor, ...args)`
Registers a `processor` with `...args` arguments.

### `registerMixin(property, fn)`
Registers a `property` as a unique mixin key which calls `fn` to resolve.

## deregister
### `deregisterProcessor(processor)`
Deregisters a `processor`.

### `deregisterMixin(property)`
Registers a `property`.

## get
### `getProcessorArgs(processor)`
Returns a `processor`'s registered arguments.

### `getMixinFn(property)`
Returns a mixin `property`'s registered resolving function.

## getAll
### `getProcessors()`
Returns a map of all registered processors.

### `getMixins()`
Returns a map of all registered mixins.
