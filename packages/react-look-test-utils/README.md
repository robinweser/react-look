<h1 align="center">Test utilities for <a href="../react-look/">react-look</a></h1>
<p align="center">
<img alt="npm version" src="https://badge.fury.io/js/react-look-test-utils.svg">
<img alt="react version" src="https://img.shields.io/badge/react--look-%5E1.0.0--beta7-brightgreen.svg">
<br>
Not compatible with <a href="../react-look-native/">react-look-native</a> (for now)
</p>

### Disclaimer
Before using the test utils, please note that all methods only include Look-specific classNames and are build for encapsulated styling tests without side-effects.
They do not return third-party or global classNames.<br>
For such use-case you might want to use  [window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

#### react-look-native support?
If you're wondering why there's no support for react-look-native? The answer is simple. You just don't need any helper to gather the styles as React Native Components provide all styles using the `props.style` so you can simply check those. There are no outsourced styles such as CSS classes.

## Usage
`getResolvedStyle` requires the Component to be rendered correctly. Therefore a shallow renderer is used in the examples down. I recommend using [enzyme](http://airbnb.io/enzyme/) build by [Airbnb](http://nerds.airbnb.com).
# API
* [getStaticStyle](#getstaticstyleelement--pseudoclass-mediaconfig)
* [getPseudoStyle](#getpseudostyleelement-pseudoclass--mediaconfig)
* [getMediaStyle](#getmediastyleelement-mediaconfig--pseudoclass)
* [getResolvedStyle](#getresolvedstyleelement-component-config--pseudoclass-mediaconfig)

## `getStaticStyle(element [, pseudoClass, mediaConfig])`
Returns all static CSS styles applied to an `element`. Optionally pass additional information on *simulated* pseudo classes and device configuration to match media queries.
Uses `getPseudoStyle` and `getMediaStyle` to get those.

## `getPseudoStyle(element, pseudoClass [, mediaConfig])`
Returns pseudo class specific static CSS styles applied to an `element`. Pass either a string *e.g.* `:hover` or an array of strings *e.g.* `[':hover', ':active']` to simulate pseudo classes.
Optionally add media configuration to also include pseudo classes within media queries.

```javascript
const styles = StyleSheet.create({
  box: {
    color: 'red',
    ':hover': {
      color: 'blue',
      ':active': {
        fontSize: 13
      }
    },
    ':active': {
      fontSize: 15
    },

    // also supports pseudo classes within media queries
    '@media (min-height: 300px)': {
      ':active': {
        lineHeight: 1.5
      }
    }
  }
})

// finally a simple JSX-rendered element with our styles
const element = <div className={styles.box}></div>

getPseudoStyle(element, ':hover') // => {color: 'blue'}
getPseudoStyle(element, ':active') // => {fontSize: 15}
getPseudoStyle(element, ':hover:active') // => {fontSize: 13}
getPseudoStyle(element, [':hover', ':active']) // => {color: 'blue', fontSize: 15}
getPseudoStyle(element, ':active', { height: 400 }) // => {fontSize: 15, lineHeight: 1.5}
```

## `getMediaStyle(element, mediaConfig)`
Returns static CSS styles applied to an `element` within media queries. It uses [match-media-mock](https://github.com/azazdeaz/match-media-mock) to resolve media query expressions using device configuration passed with `mediaConfig` such as `screen`, `width` or `orientation`.
```javascript
const styles = StyleSheet.create({
  box: {
    color: 'red',
    '@media (orientation: landscape)': {
      color: 'blue'
    },
    '@media (min-width: 300px)': {
      fontSize: 15,
      '@media (min-height: 400px)': {
        lineHeight: 13
      }
    }
  }
})
// finally a simple JSX-rendered element with our styles
const element = <div className={styles.box}></div>

getMediaStyle(element, { orientation: 'landscape' }) // => {color: 'blue'}
getMediaStyle(element, { width: 400 }) // => {fontSize: 15}
getMediaStyle(element, { width: 400, orientation: 'landscape' }) // => {color: 'blue', fontSize: 15}
getMediaStyle(element, { width: 400, height: 500 }) // => {fontSize: 15, lineHeight: 13}
```

## `getResolvedStyle(element, Component, config [, pseudoClass, mediaConfig])`
Returns an object containing all resolved styles as they'd be applied within a real application. In order to get correct output, you need to pass the right `Component` and your whole Look `config`.
It uses `getStaticStyle` to get all the static styles including pseudo classes and media queries.

```javascript
const styles = StyleSheet.create({
  box: {
    color: 'red',
    'isActive=true': {
      color: 'blue'
    },
    fontSize: props => props.fontSize
  }
})

// This time we can't just render a simple element
// but need to have the whole Component in order to
// get the props, state, etc. to resolve dynamic styles
// Using props only you can also use stateless Components
class Test extends Component {
  static defaultProps = { fontSize: 10 };
  render() {
    return (
      <div className={styles.box}></div>
    )
  }
}

// enhance your Component with look to inject
// the Look resolver into the render method
Test = look(Test)

// uses any kind of shallow renderer to render the Component
// I recommend enzyme's shallow renderer to do this
const wrapperA = shallow(<Test />)
getResolvedStyle(wrapperA.find('div'), wrapperA, Presets['react-dom']) // => {color: 'red', fontSize: 10}
const wrapperB = shallow(<Test isActive/>)
getResolvedStyle(wrapperB.find('div'), wrapperB, Presets['react-dom']) // => {color: 'blue', fontSize: 10}
const wrapperC = shallow(<Test fontSize={15} />)
getResolvedStyle(wrapperC.find('div'), wrapperC, Presets['react-dom']) // => {color: 'red', fontSize: 15}
```
#### Global instance
You most likely want to use the same Look config all the time. For this case you might want add a global custom instance of `getResolvedStyle`.

```javascript
import { getResolvedStyle } from 'react-look-test-utils'
import { Presets } from 'react-look'

// makes it available for all tests as a global method
global.getLookStyle = (element, Component) => {
  return getResolvedStyle(element, Component, Presets['react-dom'])
}
```
Now add `--require path/to/your/test-setup.js` to your mocha options (optionally create a `mocha.opts` file).

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
