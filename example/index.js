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
