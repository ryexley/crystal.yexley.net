define([
	"underscore",
	"backbone",
	"text!template/contact.tmpl.html"
], function (_, Backbone, ContactTemplate) {

	// See this URL for details about using the SendGrid API to send an email:
	// http://sendgrid.com/docs/API_Reference/Web_API/mail.html

	var ContactView = Backbone.View.extend({
		el: "#contact",

		initialize: function () {
			_.bindAll(this, "render");
			this.render();
		},

		render: function () {
			this.$el.html(ContactTemplate);
		}
	});

	return ContactView;

});
