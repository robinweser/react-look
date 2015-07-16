import State from '../map/state';
import assign from 'object-assign';

const events = {
	'active': {
		onMouseDown: true
	},
	'hover': {
		mouseEnter: true,
		mouseLeave: false
	},
	'focus': {
		onFocus: true,
		onBlur: false
	}
};
/*
 * Adds additional event listeners to target some special pseudo-classes
 * Only get applied if actually needed
 * NOTE: This has been heavily copied from Radium. Great thanks for providing this nice stuff.
 */
export default function addRequiredEventListeners(container, element, key, newProps) {
  /*
   * This checks if there are any needed pseudo-classes that need an event listener by checking the pseudo map for this element
   */
  if (State.get(container, 'pseudoMap').get(element.props.look).size > 0) {
    let pseudo = State.get(container, 'pseudoMap').get(element.props.look);

		let event;
		for (event in events){
			if (pseudo.get(event)){
				newProps = assign(newProps, addEventListener(container, element.props, key, event, events[event]));
			}
		}

		//deprecated
    let validTypes = ['url', 'email', 'tel', 'range', 'number'];
    if (pseudo.get('change') && element.type == 'input' && validTypes.indexOf(newProps.type) != -1) {
      newProps = assign(newProps, addChangeListener(container, element, key));
    }
  }
}


/*
 * Adds an event listener to target pseudo-classes
 * This only gets applied if an element acutally got action-pseudo-class-specific styles
 */
function addEventListener(container, props, key, state, listener) {
  let newProps = props;

  let event;
  for (event in listener) {
    let existing = newProps[event];
    newProps[event] = e => {
      existing && existing(e);
      State.setState(state, listener[event], container, key)
    }
  }
  if (state == 'active') {
    container._lastActive.push(key);
  }
  return newProps;
}



/*
 * Adds a change listener to validate :valid and :invalid pseudo-classes
 * Only gets applied if the current element is an input elementement.
 * Also it needs to be of type: url, telement, email or range, number
 * TODO: Add a new pseudoMap entry called validation to target needed listeners more accurate
 */
function addChangeListener(container, element, key) {
  let newProps = element.props;
  let existingOnChange = newProps.onChange;

  newProps.onChange = function(e) {
    existingOnChange && existingOnChange(e);
    State.setState('change', e.target.value, container, key);
  };
  return newProps;
}
