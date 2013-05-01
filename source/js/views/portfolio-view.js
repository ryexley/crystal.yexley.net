define([
	"underscore",
	"backbone",
	"text!template/portfolio.tmpl.html"
], function (_, Backbone, PortfolioTemplate) {

	var PortfolioView = Backbone.View.extend({
		el: "#portfolio",

		initialize: function () {
			_.bindAll(this, "render");
			this.render();
		},

		render: function () {
			this.$el.html(PortfolioTemplate);
		}
	});

	return PortfolioView;

});
