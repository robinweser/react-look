export default {
	set(state, el) {
			return state._obscene.set(el, new Map());
		},
		setState(state, el, prop, value) {
			return state._obscene.get(el).set(prop, value);
		},

		get(state, el, prop) {
			return state._obscene.get(el);
		},

		getState(state, el, prop) {
			return state._obscene.get(el).get(prop);
		},

		has(state, el) {
			return state._obscene.has(el);
		}
}