define([
	"underscore",
	"backbone",
	"swipe",
	"views/menubar",
	"text!template/app-view.tmpl.html"
], function (_, Backbone, Swipe, Menubar, AppViewTemplate) {

	var AppView = Backbone.View.extend({
		className: "swipe",
		attributes: { id: "app-view" },

		events: {
		},

		initialize: function () {
			_.bindAll(this, "render", "setPageSize", "setRequestedPage");
			this.render();
			this.setRequestedPage();
			this.window.on("resize", this.setPageSize);
			this.window.on("hashchange", this.setRequestedPage);
		},

		render: function () {
			this.window = $(window);
			this.menubar = new Menubar();
			var content = $("<div class='swipe-wrap' />").append(AppViewTemplate);
			this.$el.empty().append(content);
			this.$el.prependTo("body");
			this.setPageSize();
			this.setupPager();
		},

		setupPager: function () {
			var self = this;

			this.pages = new Swipe(document.getElementById("app-view"), {
				callback: function (index, el) {
					self.swiping = true;

					var hash = "#";
					var targetPage = $(el);

					if (targetPage.data("index") !== 0) {
						hash = "#/" + $(el).prop("id");
					}

					window.location.hash = hash;
				},
				transitionEnd: function (index, el) {
					self.swiping = false;
				}
			});
		},

		setPageSize: function (e) {
			this.$(".page").css({ height: this.window.height(), width: this.window.width() });
		},

		setRequestedPage: function () {
			if (!this.swiping) {
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
		}
	});

	return AppView;

});
