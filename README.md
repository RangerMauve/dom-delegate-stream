# dom-delegate-stream

Uses DOM event delegation to create streams of events that target specific
elements. Based on [dom-delegate](https://github.com/ftlabs/ftdomdelegate).

This allows your UI containing the actual display of your app to change
dynamically without you having to manually re-establish listeners. You also get
a performance benefit because fewer listeners get established and executed on
the DOM itself.

Having streams of events also allows you to integrate with any streaming API out
there already with ease, and allows you to truely shift into thinking about real
time data flow rather than imperative code execution.

## Installing

``` bash
npm install --save dom-delegate-event
```

This library was created to be used with [browserify](http://browserify.org).

## API

### `delegate([element])`

Creates a delgator object from a given root DOM node, you can also specify the
node later with Delegator#root

#### parameters
* `[element]` (DOMNode): The root DOM node to attach listeners to

#### returns
* (Delegator): The new Delegator instance

### `Delegator#on(eventType,[selector])`

This creates an EventStream that binds to the eventType and outputs all events
that target elements that match the given selector. If the selector is not
provided, then the root element is used instead.

#### parameters
* `eventType` (String): The type of event you want to listen to, e.g. "click"
* `[selector]` (String): The CSS selector to match elements against.

#### returns
* (EventStream): The stream of DOM events that match the parameters

### `Delegator#root([node])`

This changes the root element for binding to events, calling this function with
no paramters will destroy the root node and effectively stop all streams.

#### parameters
* `[node]` (DOMNode): The node to bind events on.

### `Delegator#destroy()`

This destroys the Delegator instance and removes any listeners that it has.

## Example

In this example we:
* listen for button presses
* fetch the inner text of the buttons
* concatonate all these events into an array
* use the array to render an unsorted list of new buttons
* patch that list into the DOM

Note that even though the new buttons were generated dynamically,
the event stream still registers them because they match the selector.

``` javascript
var domDelegate = require("../");
var map = require("through2-map").obj;
var concat = require("array-concat-stream");
var patcher = require("html-patcher-stream");

var output = document.getElementById("output");

delegate = domDelegate(document.body);

delegate.on("click", "button")
  .pipe(map(function (event) {
    return event.target.innerText
  }))
  .pipe(concat([]))
  .pipe(map(function (items) {
    return "<div>" + items.map(function (item) {
      return "<button>" + item + "</button>";
    }).join("\n") + "</div>";
  }))
  .pipe(patcher(output, "<div></div>"))

```

``` html
<div>
  <button>Foo</button>
  <button>Bar</button>
  <button>Baz</button>
</div>
<div id="output"></div>
```
