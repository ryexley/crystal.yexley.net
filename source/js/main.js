requirejs.config({
	paths: {
		"underscore": "lib/underscore",
		"backbone": "lib/backbone",
		"swipe": "lib/swipe"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		"swipe": {
			exports: "Swipe"
		}
	}
});

(function () {

	requirejs(["app"], function (App) {
		var app = new App();
		app.start();
		window.app = app;
	});

}());
