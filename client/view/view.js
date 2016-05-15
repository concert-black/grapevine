Template.view.helpers({
  post: () => {
    const controller = UI.controller();
    return Posts.find({_id: controller.get('id')});
  },
  time: function () {
    return moment(this.date).format('h:mm:ss A');
  }
});
Template.view.events({
  'click .toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  }
});
