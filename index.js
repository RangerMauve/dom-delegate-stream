var delegate = require("dom-delegate");
var Readable = require("stream").Readable;

function domDelegateStream(element) {
	var delegator = delegate(element);

	return {
		on: on,
		off: off,
		root: root,
		destroy: destroy
	}

	function on(eventType, selector, useCapture) {
		// TODO: Return readable stream here

		function handler() {

		}

		delegator.on(eventType, selector, handler, useCapture);
	}

	function off(eventType, selector, useCapture) {
		return delegator.off(eventType, selector, useCapture);
	}

	function root(element) {
		return delegator.root(element);
	}

	function destroy() {
		return delegator.destroy();
	}
}
