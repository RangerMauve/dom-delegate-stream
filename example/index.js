var domDelegate = require("../");
var map = require("through2-map").obj;
var stdout = require("stdout")();

var output = document.getElementById("output");

delegate = domDelegate(document.body);

delegate.on("click", "button")
	.pipe(map(function (event) {
		return event.target.innerText
	}))
	.pipe(stdout);
