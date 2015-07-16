import State from '../map/state';
import assign from 'object-assign';

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
    let pseud = State.get(container, 'pseudoMap').get(element.props.look);

    if (pseudo.get('active')) {
      newProps = assign(newProps, addActiveListener(container, element, key));
    }

    if (pseudo.get('hover')) {
      newProps = assign(newProps, addHoverListener(container, element, key));
    }

    if (pseudo.get('focus') && element.type == 'input') {
      newProps = assign(newProps, addFocusListener(container, element, key));
    }


    let validTypes = ['url', 'email', 'tel', 'range', 'number'];

    if (pseudo.get('change') && element.type == 'input' && validTypes.indexOf(newProps.type) != -1) {
      newProps = assign(newProps, addChangeListener(container, element, key));
    }
  }
}

/*
 * Adds a mouse-hover listener to target :hover pseudo-classes
 * This only gets applied if an element acutally got :hover-specific styles
 */
function addHoverListener(container, element, key) {
  let newProps = element.props;
  let existingOnMouseEnter = newProps.onMouseEnter;
  let existingOnMouseLeave = newProps.onMouseLeave;

  newProps.onMouseEnter = function(e) {
    existingOnMouseEnter && existingOnMouseEnter(e);
    State.setState('hovered', true, container, key);
  };

  newProps.onMouseLeave = function(e) {
    existingOnMouseLeave && existingOnMouseLeave(e);
    State.setState('hovered', false, container, key);
  }
  return newProps;
}



/*
 * Adds a mouse-down listener to target :active pseudo-classes
 * This only gets applied if an element acutally got :active-specific styles
 */
function addActiveListener(container, element, key) {
  let newProps = element.props;
  let existingOnMouseDown = newProps.onMouseDown;

  newProps.onMouseDown = function(e) {
    existingOnMouseDown && existingOnMouseDown(e);

		//adds current element key to a active list which gets cleaned on mouseUp again (see enhancer)
    container._lastActive.push(key);
    State.setState('active', true, container, key);
  }
  return newProps;
}


/*
 * Adds a input-focus listener to target :focus pseudo-classes
 * This only gets applied if an element acutally got :focus-specific styles
 * Also element's type needs to be input
 */
function addFocusListener(container, element, key) {
  let newProps = element.props;
  let existingOnFocus = newProps.onFocus;
  let existingOnBlur = newProps.onBlur;

  newProps.onFocus = function(e) {
    existingOnFocus && existingOnFocus(e);
    State.setState('focused', true, container, key);
  };

  newProps.onBlur = function(e) {
    existingOnBlur && existingOnBlur(e);
    State.setState('focused', false, container, key)
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
    State.setState('changed', e.target.value, container, key);
  };
  return newProps;
}
