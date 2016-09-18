import constants from '/both/constants';

Router.configure({
	loadingTemplate: 'overlay',
	notFoundTemplate: '404',
});

Router.route('/', function () {
	this.render('allPosts');
});
Router.route('/post/:id', {
	action: function () {
		this.render('viewPost');
	},
	data: function () {
		return constants.posts.findOne({ id: this.params.id });
	},
	waitOn: function () {
		return Meteor.subscribe('post', this.params.id);
	},
});
