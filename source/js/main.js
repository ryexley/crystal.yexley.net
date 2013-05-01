requirejs.config({
	urlArgs: "v=" + ( new Date() ).getTime(),
	paths: {
		"underscore": "lib/underscore",
		"backbone": "lib/backbone",
		"swipe": "lib/swipe",
		"text": "lib/text",
		"template": "../templates"
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
