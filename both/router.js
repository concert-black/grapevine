Router.route('/', function () {
  this.render('all')
});
Router.route('/new', function () {
  this.render('new')
});
Router.route('/post/:id', function () {
  this.render('view', {
    data: function () {
      return Posts.findOne({id: this.params.id});
    }
  });
});
