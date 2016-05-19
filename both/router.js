import * as constants from '/both/constants';

Router.route('/', function () {
  this.render('all-posts');
});
Router.route('/post/:id', function () {
  this.render('view-post', {
    data: function () {
      return constants.Posts.findOne({id: this.params.id});
    }
  });
});
