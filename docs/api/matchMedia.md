<div style="float:left"><a href="State.md">< <b>3. State</b></a></div>

# 4. matchMedia
Like [Radium](https://github.com/FormidableLabs/radium/tree/master/docs/api#configsetmatchmedia), Look also provides an API interface to replace the default matchMedia function which is `window.matchMedia`. 

This is mostly used for server-side rendering or to support older browser such as IE 8.
#### Polyfill
A useful polyfill is paul irish's [matchMedia](https://github.com/paulirish/matchMedia.js/).

## Usage
```javascript
import matchMedia from 'react-look';

let matchMediaFunc = function(){
	/* matchMedia function here */
}
matchMedia.setMatchMedia(matchMediaFunc);
```

## Methods
- [setMatchMedia](#setmatchmediamatchmediafunction)
- [getMatchMedia](#getmatchmedia)
- [canMatchMedia](#canmatchmedia)


### `setMatchMedia(matchMediaFunction)`
Replaces the default matchMedia function with a custom `matchMediaFunction`. 

### `getMatchMedia()`
Returns the currently used matchMedia function.

### `canMatchMedia()`
Returns if the executing environment is capable of executing `window.matchMedia`. 