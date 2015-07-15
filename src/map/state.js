import assign from 'object-assign';

/*
 * A small helper module to handle States within react-look
 */
export default {
	/*
	 * Set/Add a new key with some new object
	 */
	add(container, key) {
			return container.state._look.set(key, new Map());
		},

		/*
		 * Get all states/information about a key
		 */
		get(container, key) {
			return container.state._look.get(key);
		},

		/*
		 * Check if there's already information about a key
		 */
		has(container, key) {
			return container.state._look.has(key);
		},

		/*
		 * Get a specific state of a key
		 */
		getState(state, container, key) {
			return container.state._look.get(key).get(state);
		},

		/*
		 * Set a key's state
		 */
		setState(state, value, container, key) {
			container.state._look.get(key).set(state, value);
			return container.setState(container.state._look);
		},

		/*
		 * Check if a key has a specific state
		 */
		hasState(state, container, key) {
			return container.state._look.has(key).has(state);
		}
}