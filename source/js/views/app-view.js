define([
	"underscore",
	"backbone",
	"swipe",
	"text!template/app-view.tmpl.html"
], function (_, Backbone, Swipe, AppViewTemplate) {

	var AppView = Backbone.View.extend({
		className: "swipe",
		attributes: { id: "app-view" },

		events: {
			"click .page": "testFunctionRemoveMe"
		},

		initialize: function () {
			_.bindAll(this, "render", "testFunctionRemoveMe");
			this.render();
		},

		render: function () {
			var content = $("<div class='swipe-wrap' />").append(AppViewTemplate);
			this.$el.empty().append(content);
			this.$el.prependTo("body");
			this.pages = new Swipe(document.getElementById("app-view"));
		},

		testFunctionRemoveMe: function (e) {
			this.pages.next();
		}
	});

	return AppView;

});
