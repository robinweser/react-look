import assign from 'object-assign';
const defaultKey = 'root';
/*
 * A small helper module to handle States within react-look
 */
export default {
	/*
	 * Set/Add a new key with some new object
	 */
	add(container, key=defaultKey) {
			return container.state._look.set(key, new Map());
		},

		/*
		 * Get all states/information about a key
		 */
		get(container, key=defaultKey) {
			return container.state._look.get(key);
		},
		
		/*
		 * Sets a whole new state map for a key
		 */
		set(states, container, key=defaultKey) {
			return container.state._look.set(key, states);
		},

		/*
		 * Check if there's already information about a key
		 */
		has(container, key=defaultKey) {
			return container.state._look.has(key);
		},

		/*
		 * Get a specific state of a key
		 */
		getState(state, container, key=defaultKey) {
			return container.state._look.get(key).get(state);
		},

		/*
		 * Set a key's state
		 */
		setState(state, value, container, key=defaultKey) {
			container.state._look.get(key).set(state, value);
			return container.setState(container.state._look);
		},

		/*
		 * Check if a key has a specific state
		 */
		hasState(state, container, key=defaultKey) {
			return container.state._look.has(key).has(state);
		}
}