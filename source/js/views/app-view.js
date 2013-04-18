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
			_.bindAll(this, "render", "setPageSize", "testFunctionRemoveMe");
			this.render();
			this.window.on("resize", this.setPageSize);
		},

		render: function () {
			this.window = $(window);
			var content = $("<div class='swipe-wrap' />").append(AppViewTemplate);
			this.$el.empty().append(content);
			this.$el.prependTo("body");
			this.setPageSize();
			this.pages = new Swipe(document.getElementById("app-view"), {
				callback: function (index, el) {
					// window.location.hash = $(el).prop("id");
					// TODO: need to update the window location and browser history with the selected hash (element ID) here.
				}
			});
			// TODO: check window.location for a hash and navigate to the appropriate page if the hash matches an existing page
		},

		setPageSize: function (e) {
			this.$(".page").css({ height: this.window.height(), width: this.window.width() });
		},

		testFunctionRemoveMe: function (e) {
			this.pages.next();
		}
	});

	return AppView;

});
