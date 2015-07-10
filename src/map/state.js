import assign from 'object-assign';

export default {
	set(wrapper, el, prop) {
			wrapper.state._obscene.set(el, prop);
		},
		setState(wrapper, el, prop, value) {
			wrapper.state._obscene.get(el).set(prop, value);
			wrapper.setState(wrapper.state._obscene);
		},

		get(wrapper, el) {
			return wrapper.state._obscene.get(el);
		},

		getState(wrapper, el, prop) {
			return wrapper.state._obscene.get(el).get(prop);
		},

		has(wrapper, el) {
			return wrapper.state._obscene.has(el);
		},

		hasState(wrapper, state) {
			return wrapper.state._obscene.has(el).has(state);
		}
}