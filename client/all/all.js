import * as utilities from '/both/utilities';
import * as constants from '/both/constants';

Template.all.helpers({
  posts: () => {
    return constants.Posts.find({}, {
      sort: {date: -1}
    });
  }
});
Template.all.events({
  'click .toolbarCreate': (event) => {
    event.preventDefault();
    Router.go('/new');
  }
});
Template.post.events({
  'click .post': function (event) {
    event.preventDefault();
    Router.go(`/post/${this.id}`);
  }
});
Template.post.helpers({
  distance: function () {
    const position = JSON.parse(Session.get('position'));
    return utilities.format(utilities.distance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), constants.UNITS.distance);
  },
  time: function () {
    return this.date;
  },
});
