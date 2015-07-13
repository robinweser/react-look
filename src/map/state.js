import assign from 'object-assign';

export default {
	set(wrapper, el, prop) {
			wrapper.state._look.set(el, prop);
		},
		setState(wrapper, el, prop, value) {
			wrapper.state._look.get(el).set(prop, value);
			wrapper.setState(wrapper.state._look);
		},

		get(wrapper, el) {
			return wrapper.state._look.get(el);
		},

		getState(wrapper, el, prop) {
			return wrapper.state._look.get(el).get(prop);
		},

		has(wrapper, el) {
			return wrapper.state._look.has(el);
		},

		hasState(wrapper, state) {
			return wrapper.state._look.has(el).has(state);
		}
}