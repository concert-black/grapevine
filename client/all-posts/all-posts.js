import * as utilities from '/both/utilities';
import * as constants from '/both/constants';

function triggerPost () {
  const post = $('.text-input').val();
  const position = JSON.parse(Session.get('position'));
  if (! utilities.checkPost(post)) {
    alert('Invalid post.');
    return;
  } else if (! position) {
    alert('Geolocation error.');
    return;
  }
  Meteor.call('posts.insert', post, position);
  $('.text-input').val('');
}

Template['all-posts'].helpers({
  posts: () => {
    return constants.Posts.find({}, {
      sort: {date: -1}
    });
  },
  empty: () => {
    return constants.Posts.find().count() === 0;
  }
});
Template['all-posts'].events({
  'click .text-button': (event) => {
    event.preventDefault();
    triggerPost();
  },
  'keydown .text-input': (event) => {
    if (event.which === 13) {
      event.preventDefault();
      triggerPost();
    }
  },
  'click .template-post': function (event) {
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
      }), constants.UNITS.distance, false);
  }
});
