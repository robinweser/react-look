# Build your own: Prefixer

A prefixer is used to add vendor-prefixes to your style objects and `@keyframes` rules.

## API
To build a custom prefixer you need to extend the basic [Prefixer](../Prefixer.md) which is provided by Look. Also do not forget to call `super()` within your `constructor`.<br>
You will most likely overwrite both `prefix` and `getKeyframesPrefix`. Desprite the need of those two fundamental methods, you can add as many other stuff as you'd want to.

## Example
Let's say we want to recreate the [DynamicPrefixer](../prefixer/DynamicPrefixer.md) which uses [caniuse.com](caniuse.com) data and `userAgent` parsing to detect browser information to prefix styles.
```javascript
// first you will need to import the basic Prefixer
import { Prefixer } from 'react-look'
// as well as the one we want to use actually
import InlineStylePrefixer from 'inline-style-prefixer'

// Create a new class extending the Prefixer
class DynamicPrefixer extends Prefixer {
  // now you can do like everything you'd like to
  // but don't forget to call super() first
  constructor(config) {
    super()
    this._prefixer = new InlineStylePrefixer(config)
  }

  // Overwrite the prefix method with the one you actually need
  prefix(styles) {
    return this._prefixer.prefix(styles)
  }

  // as well as the keyframes prefixing
  getKeyframesPrefix() {
    return [ this._prefixer.cssPrefix ]
  }
}
```

And that's it. Now you can use it instead of the basic one.<br> *e.g. with `navigator.userAgent`*
```javascript
const config = {
  prefixer: new DynamicPrefixer({userAgent: navigator.userAgent})
}
```
