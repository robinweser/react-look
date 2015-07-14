import assign from 'object-assign';

/*
 * A small helper module to handle States within react-look
 */
export default {
	/*
	 * Set/Add a new key with some new object
	 */
	set(wrapper, key, prop) {
			return wrapper.state._look.set(key, prop);
		},
		/*
		 * Set a key's state
		 */
		setState(wrapper, key, prop, value) {
			wrapper.state._look.get(key).set(prop, value);
			return wrapper.setState(wrapper.state._look);
		},

		/*
		 * Get all states/information about a key
		 */
		get(wrapper, key) {
			return wrapper.state._look.get(key);
		},

		/*
		 * Get a specific state of a key
		 */
		getState(wrapper, key, prop) {
			return wrapper.state._look.get(key).get(prop);
		},

		/*
		 * Check if there's already information about a key
		 */
		has(wrapper, key) {
			return wrapper.state._look.has(key);
		},

		/*
		 * Check if a key has a specific state
		 */
		hasState(wrapper, state) {
			return wrapper.state._look.has(key).has(state);
		}
}