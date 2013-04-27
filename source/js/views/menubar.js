define([
	"underscore",
	"backbone",
	"text!template/menubar.tmpl.html"
], function (_, Backbone, MenubarTemplate) {

	var Menubar = Backbone.View.extend({
		tagName: "nav",
		attributes: { id: "menubar" },

		initialize: function () {
			_.bindAll(this, "render");
			this.render();
		},

		render: function () {
			this.$el.empty().append(MenubarTemplate);
			this.$el.prependTo("body");
		}
	});

	return Menubar;

});
