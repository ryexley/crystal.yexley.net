define([
	"underscore",
	"backbone",
	"swipe",
	"views/menubar",
	"views/home-view",
	"views/portfolio-view",
	"views/contact-view",
	"text!template/app-view.tmpl.html"
], function (_, Backbone, Swipe, Menubar, HomeView, PortfolioView, ContactView, AppViewTemplate) {

	var AppView = Backbone.View.extend({
		className: "swipe",
		attributes: { id: "app-view" },
		baseWindowTitle: "Crystal Yexley",

		events: {
		},

		initialize: function () {
			_.bindAll(this, "render", "setPageSize", "setRequestedPage", "setPageTitle");

			this.window = $(window);
			this.window.on("resize", this.setPageSize);
			this.window.on("hashchange", this.setRequestedPage);

			this.render();
			this.setRequestedPage();
		},

		render: function () {
			var self = this;
			this.menubar = new Menubar();
			this.menubarEl = $("#menubar");
			var content = $("<div class='swipe-wrap' />").append(AppViewTemplate);
			this.$el.empty().append(content);
			this.$el.prependTo("body");
			this.homeView = new HomeView();
			this.portfolioView = new PortfolioView();
			this.contactView = new ContactView();
			this.setupPager();
			this.setPageTitle();
			// HACK: trigger window resizing to call setupPageSize once initial rendering is done
			setTimeout(function () { self.window.trigger("resize"); }, 150);
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
					self.setPageTitle();
				},
				transitionEnd: function (index, el) {
					self.swiping = false;
				}
			});
		},

		setPageSize: function (e) {
			this.$(".page").css({
				height: this.window.height(),
				paddingTop: this.menubarEl.height(),
				width: this.window.width()
			});

			$("#home > #intro").css({ top: this.menubarEl.height() + "px" });
			$("#home > #intro > #intro-content").css({ height: $("#home > #intro").height() - $("#home > #intro > h1").height() + "px" });
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
		},

		setPageTitle: function () {
			var currentPage = this.$("[data-index=\"" + this.pages.getPos() + "\"]");
			$(document).prop("title", this.baseWindowTitle + " | " + currentPage.data("title"));
		}
	});

	return AppView;

});
