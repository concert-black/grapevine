Template.all.helpers({
  posts: () => {
    return Posts.find();
  }
});
Template.all.events({
  'click .toolbarCreate': (event) => {
    event.preventDefault();
    Router.go('/new');
  }
})
Template.new.helpers({
  draft: () => {
    return Session.get('draft');
  }
});
Template.new.events({
  'click .toolbarBack': (event) => {
    event.preventDefault();
    Session.set('draft', $('.post-input').val());
    Router.go('/');
  }
});
Template.toolbarLoading.helpers({
  loading: () => {
    return Session.get('loading') ? 1 : 0;
  }
});

Session.set('loading', true);
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    Session.set('loading', false);
    Session.set('position', JSON.stringify(coordinates));
    Meteor.subscribe('posts', JSON.parse(Session.get('position')));
  }, (error) => {
    Session.set('loading', false);
    alert('geolocation error');
  });
} else {
  Session.set('loading', false);
  alert('no geolocation');
}
