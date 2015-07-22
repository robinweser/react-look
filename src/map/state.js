import assign from 'object-assign';
const defaultKey = 'root';

/**
 * A small helper module to handle States within react-look
 */
export default {

	/**
	 * Set/Add a new key with some new object
	 *@param {Component} container - outer wrapping React Component
	 * @param {string} key - a unique key that gets added
	 */
	add(container, key = defaultKey) {
			return container.state._look.set(key, new Map());
		},

		/**
		 * Returns all states/information about a key
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique key whichs state gets returned
		 */
		get(container, key = defaultKey) {
			return container.state._look.get(key);
		},

		/**
		 * Sets a whole new state map for a key
		 *@param {Object} states  - states that get applied
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique key which gets states set
		 */
		set(states, container, key = defaultKey) {
			return container.state._look.set(key, states);
		},

		/**
		 * Check if there's already information about a key
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique key which gets checked
		 */
		has(container, key = defaultKey) {
			return container.state._look.has(key);
		},

		/**
		 * Returns a specific state of a key
		 * @param {string} state- state that gets returned
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique whichs state gets returned
		 */
		getState(state, container, key = defaultKey) {
			return container.state._look.get(key).get(state);
		},

		/**
		 * Set a key's state
		 * @param {string} state - state that gets set/replaced
		 * @param {string|number|Object|Map} value - value that gets added
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique key whichs state gets set
		 */
		setState(state, value, container, key = defaultKey) {
			container.state._look.get(key).set(state, value);
			return container.setState(container.state._look);
		},

		/**
		 * Check if a key has a specific state
		 *@param {string} state - state that gets checked
		 *@param {Component} container - outer wrapping React Component
		 * @param {string} key - a unique key whichs state gets checked
		 */
		hasState(state, container, key = defaultKey) {
			return container.state._look.has(key).has(state);
		}
}