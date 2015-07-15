# State
Using State you can get/set special states for specific components.<br>

> **Warning**: This only applies to elements that provide an explicit `key` or `ref`.<br>

## Usage

```javascript
import {Look, State} from 'react-look';

let sheet = new Look({
  box : {':active' : {}},
  item : {':hover' : {}}
});

class Header extends React.Component {
  render(){
    <div look="box">
      <span look="item" key="first">First</span>
      <span look="item" key="second">Second</span>
    </div>
  }
}

let extendedHeader = Look.applyTo(Header)

// returns all 'box'-states since default-key is 'box'
State.get(extendedHeader)
// returns 'second's active state
State.getState('hover', extendedHeader, 'second')
```

##Valid actions states are
* hovered
* focused
* changed (returns newest value)
* active

## Methods
- [add](#addcontainer-key)
- [get](#getcontainer-key)
- [set](#setstates-container-key)
- [has](#hascontainer-key)
- [getState](#getstatestate-container-key)
- [setState](#setstatestate-value-container-key)
- [hasState](#hasstatecontainer-state)


### `add(container [, key])`
Adds a new element reference by `key` to the state map.

### `get(container [, key])`
Returns a whole state map for a specific `key`.

### `set(states, container [, key])`
Sets a whole new `states` map for a given `key`.

### `has(container [, key])`
Checks if a `key` has already been added.

### `getState(state, container [, key])`
Returns a `key`'s current `state`.

### `setState(state, value, container [, key])`
Sets a `key`'s `state` with a new `value`.

### `hasState(state, container [, key])`
Checks if a `state` has already been assigned for a `key`.
