import * as constants from '/both/constants';

Router.route('/', function () {
  this.render('all')
});
Router.route('/new', function () {
  this.render('new')
});
Router.route('/post/:id', function () {
  this.render('view', {
    data: function () {
      return constants.Posts.findOne({id: this.params.id});
    }
  });
});
