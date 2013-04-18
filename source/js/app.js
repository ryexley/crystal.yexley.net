define([
	"underscore",
	"backbone",
	"views/app-view"
], function (_, Backbone, AppView) {

	var App = function () {};

	_.extend(App.prototype, {
		start: function () {
			this.view = new AppView();
			console.log("Application started...");
		}
	});

	return App;

});
