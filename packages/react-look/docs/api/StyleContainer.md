# StyleContainer
> <img src="../../../../res/private-badge.png" height=15> StyleContainer is a private instance which is only available within plugins and mixins. It is not exported.

StyleContainer is the Component that collects all your static CSS styles within a `className => styles` mapping.
It is passed down to every plugin and mixin and can be used to dynamically add more styles on demand.

## Data
* StyleContainer.**selectors** *&lt;Map>*<br>
Contains all basic selectors as well as pseudo classes
* StyleContainer.**mediaQueries** *&lt;Map>*<br>
Contains media query mappings which again contain basic selectors and their pseudo classes
* StyleContainer.**keyframes** *&lt;Map>*<br>
Contains keyframes with the animation name as key
* StyleContainer.**fonts** *&lt;Set>*<br>
Contains static strings of font-face definitions
* StyleContainer.**dynamics** *&lt;Map>*<br>
Contains all other (dynamic) styles mapped to a specific selector

## Methods
* [add](#addselector-styles--media)
* [addKeyframes](#addkeyframesanimation-frames)
* [addFont](#addfontfont)
* [renderStaticStyles](#renderstaticstylesuseragent)
* [generateClassName](#generateclassnamestyles)
* [requestClassName](#requestclassname--prefix)
* [subscribe](#subscribelistener)

### `add(selector, styles [, media])`
Adds a `selector => styles` mapping to the **selectors**. Optionally accepts a valid `media` string to add it to the **mediaQueries**.
### `addKeyframes(animation, frames)`
Adds a `animation => frames` mapping to the **keyframes**.
### `addFont(font)`
Adds a static `font`-face string to the **fonts**.
### `renderStaticStyles(userAgent)`
Renders the whole mappings into a single static CSS string. It takes a `userAgent` used to prefix the styles and the `@keyrames` prefix.
### `generateClassName(styles)`
Sorts your `styles`, stringifies them and generates a hash code which is returned as a `className`. This prevents dublication.
### `requestClassName([prefix])`
Returns an unused `className` which is build of a `prefix` *(default is `c`)* and an intern counter that gets incremented every call.
### `subscribe(listener)`
You can subscribe to style changes by passing a `listener` which then will be called.
