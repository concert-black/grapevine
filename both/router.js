import * as constants from '/both/constants';

Router.route('/', function () {
  this.render('allPosts');
});
Router.route('/post/:id', {
  action: function () { this.render('viewPost'); },
  data: function () { return constants.POSTS.findOne({ id: this.params.id })},
  waitOn: function () {
    return Meteor.subscribe('post', this.params.id);
  }
});
Router.configure({
    loadingTemplate: "overlay",
    notFoundTemplate: "404"
});
