define([
	"underscore",
	"backbone",
	"swipe"
], function (_, Backbone, Swipe) {

	var App = function () {

	};

	_.extend(App.prototype, {
		start: function () {
			console.log("Application started...");
		}
	});

	return App;

});
