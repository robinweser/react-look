export default {
	set(state, el, prop) {
			return state._obscene.set(el, prop);
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

		has(el) {
			return state._obscene.has(el);
		},
		
		hasState(el, state){
			return state._obscene.has(el).has(state);
		}
}