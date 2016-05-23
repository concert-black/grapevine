import * as utilities from '/both/utilities';
import * as constants from '/both/constants';

function triggerPost () {
  const post = $('.text-input').val();
  const position = JSON.parse(Session.get('position'));
  if (post.length === 0) {
    return; // fail silently if post is empty
  }
  if (! utilities.checkPost(post)) {
    alert('Invalid post.');
    return;
  } else if (! position) {
    alert('Geolocation error.');
    return;
  }
  position.latitude += (Math.round(Math.random()) ? 1 : -1) * constants.POSITION_VARIABILITY * Math.random();
  position.longitude += (Math.round(Math.random()) ? 1 : -1) * constants.POSITION_VARIABILITY * Math.random();
  Meteor.call('posts.insert', post, position);
  $('.text-input').val('');
}

Template.allPosts.helpers({
  posts: () => {
    return constants.posts.find({}, {
      sort: {date: -1}
    });
  },
  empty: () => {
    return constants.posts.find().count() === 0;
  }
});
Template.allPosts.events({
  'click .post-button': (event) => {
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
  },
  commentCount: function () {
    return this.comments.length;
  }
});
Template.commentCounter.helpers({
  color: function() {
    if (Template.currentData().count < 4) {
      return 'gray';
    } else if (Template.currentData().count < 16) {
      return 'goldenrod';
    } else {
      return 'orangered';
    }
  },
  noComments: function() {
    return Template.currentData().count === 0;
  }
});
