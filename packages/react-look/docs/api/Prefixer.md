# Prefixer

Prefixer is an interface used to build custom style prefixer. You **must** extend Prefixer in order to get your custom prefixer running.

## Methods
It inherits two methods which **must** be defined in order to run Look correctly.

### `prefix(styles)`
Which is called whenever you want to prefix some `styles`. It must return a new style object.<br>
By default it just returns the `styles` passed into.

### `getKeyframesPrefix()`
Used to get all prefixes needed to prefix `@keyframes` rules.<br>
By default it just returns `['']` which means the basic rule is kept.
