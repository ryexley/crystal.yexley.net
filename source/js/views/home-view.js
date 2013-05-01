define([
	"underscore",
	"backbone",
	"text!template/home.tmpl.html"
], function (_, Backbone, HomeTemplate) {

	var HomeView = Backbone.View.extend({
		el: "#home",

		initialize: function () {
			_.bindAll(this, "render");
			this.render();
		},

		render: function () {
			this.$el.html(HomeTemplate);
		}
	});

	return HomeView;

});
