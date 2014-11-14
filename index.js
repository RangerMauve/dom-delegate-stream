var delegate = require("dom-delegate");
var Readable = require("stream").Readable;

module.exports = domDelegateStream;
domDelegateStream.Delegate = domDelegateStream;

function noop() {}

function domDelegateStream(element) {
	var delegator = delegate(element);

	return {
		on: on,
		off: off,
		root: root,
		destroy: destroy
	}

	function on(eventType, selector, useCapture) {
		var stream = new Readable({
			objectMode: true
		});

		stream._read = noop;

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

	function root(element) {
		return delegator.root(element);
	}

	function destroy() {
		return delegator.destroy();
	}
}
