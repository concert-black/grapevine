import * as utilities from '/both/utilities';
import * as constants from '/both/constants';

Template['all-posts'].helpers({
  posts: () => {
    return constants.Posts.find({}, {
      sort: {date: -1}
    });
  },
  left: function () {
    return function () {
      const position = JSON.parse(Session.get('position'));
      return utilities.format(utilities.distance({
          longitude: this.location.coordinates[0],
          latitude: this.location.coordinates[1]
        }, {
          longitude: position.longitude,
          latitude: position.latitude
        }), constants.UNITS.distance);
    }
  },
  center: function () {
    return this.content;
  },
  right: function() {
    return this.date;
  },
});
Template['all-posts'].events({
  'click .template-item': function (event) {
    event.preventDefault();
    Router.go(`/post/${this.id}`);
  }
});
