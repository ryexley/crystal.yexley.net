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
			// "click .page": "testFunctionRemoveMe"
		},

		initialize: function () {
			_.bindAll(this, "render", "setPageSize", "setSelectedPage");
			this.render();
			this.setSelectedPage();
			this.window.on("resize", this.setPageSize);
			this.window.on("hashchange", this.setSelectedPage);
		},

		render: function () {
			this.window = $(window);
			var content = $("<div class='swipe-wrap' />").append(AppViewTemplate);
			this.$el.empty().append(content);
			this.$el.prependTo("body");
			this.setPageSize();
			this.pages = new Swipe(document.getElementById("app-view"));
		},

		setPageSize: function (e) {
			this.$(".page").css({ height: this.window.height(), width: this.window.width() });
		},

		setSelectedPage: function () {
			var requestedPage = window.location.hash;

			if (requestedPage) {
				requestedPage = requestedPage.replace("#", "").replace("/", "");
				this.pages.slide($("#" + requestedPage).data("index"));
			} else {
				if (this.pages.getPos() !== 0) {
					this.pages.slide(0);
				}
			}
		}
	});

	return AppView;

});
