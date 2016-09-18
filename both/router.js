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
		if (this.data()) {
			this.render('viewPost');
		} else {
			this.render('404');
		}
	},
	data: function () {
		return constants.posts.findOne({ id: this.params.id });
	},
	waitOn: function () {
		if (! constants.posts.findOne({ id: this.params.id })) {
			return Meteor.subscribe('post', this.params.id);
		}
		return;
	},
});
