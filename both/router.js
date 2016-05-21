import * as constants from '/both/constants';

Router.route('/', function () {
  this.render('all-posts');
});
Router.route('/post/:id', function () {
  this.render('view-post', {
    data: function () {
      return constants.posts.findOne({id: this.params.id});
    }
  });
});
