var delegate = require("dom-delegate");
var Readable = require("stream").Readable;

module.exports = Delegator;

function noop() {}

/**
 * Creates a delegator for events happening within a DOM node
 * @param   {Node}      element The root DOM element to bind to
 * @returns {Delegator}         Delegator object for creating Event Streams
 */
function Delegator(element) {
	var delegator = delegate(element);

	return {
		on: on,
		off: off,
		root: root,
		destroy: destroy
	}

	/**
	 * Returns a stream of DOM events that target elements matching the selector
	 * @param  {String}      eventType The type of event to listen for (e.g. "click")
	 * @param  {String}      selector  Query selector for selecting the target element
	 * @return {EventStream}           The readable stream of DOM events
	 */
	function on(eventType, selector) {
		var stream = new Readable({
			objectMode: true
		});

		stream._read = noop;

		/**
		 * Destroys the events stream and stops listening for further events
		 */
		stream.destroy = function () {
			delegator.off(eventType, selector, handler);
			stream.push(null);
		}

		function handler(event) {
			stream.push(event);
		}

		delegator.on(eventType, selector, handler);

		return stream;
	}

	/**
	 * Changes the root element for binding to events
	 * Calling this without any arguments destroys the current root node
	 * @param  {Node} element The Root DOM node to bind to
	 */
	function root(element) {
		delegator.root(element);
	}

	/**
	 * Destroys the Delegator, effectively destroying all streams
	 */
	function destroy() {
		// TODO: Actually end all streams
		delegator.destroy();
	}
}
