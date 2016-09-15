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
  position.latitude += (Math.round(Math.random()) ? 1 : -1) *
    constants.POSITION_VARIABILITY * Math.random();
  position.longitude += (Math.round(Math.random()) ? 1 : -1) *
    constants.POSITION_VARIABILITY * Math.random();
  Meteor.call('posts.insert', post, position);
  $('.text-input').val('');
}

Template.allPosts.helpers({
  posts: () => {
    const position = JSON.parse(Session.get('position'));
    const options = {
      age: (a, b) => {
        return b.date.getTime() - a.date.getTime();
      },
      distance: (a, b) => {
        const alpha = geolib.getDistance({
            longitude: a.location.coordinates[0],
            latitude: a.location.coordinates[1]
          }, position)
        const bravo = geolib.getDistance({
            longitude: b.location.coordinates[0],
            latitude: b.location.coordinates[1]
          }, position);
        return alpha - bravo;
      },
      popularity: (a, b) => {
        return b.commentCount - a.commentCount;
      }
    }; // possible values are defined in constants.js
    const posts = constants.POSTS.find().fetch(); // we don't use mongo for sorting here for a very good reason that I forgot
    window.posts = posts;
    return posts.sort(options[Session.get('sort')]);
  },
  empty: () => {
    return constants.POSTS.find().count() === 0;
  }
});
Template.allPosts.events({
  'click a': (event) => {
    event.stopPropagation();
  },
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
    Router.go(`/post/${this.id}`);
  },
  'click .sort-method': function (event) {
    Session.set('sort', this.value);
    localStorage.setItem('sort', this.value);
  }
});

Template.post.helpers({
  distance: function () {
    const position = JSON.parse(Session.get('position'));
    return utilities.format(geolib.getDistance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, position), constants.UNITS.distance, false);
  },
  commentCount: function () {
    return this.commentCount;
  }
});
Template.commentCounter.helpers({
  color: function () {
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
Template.toolbar.helpers({
  'sortMethods': function () {
    return constants.SORT_METHODS;
  },
  'selected': function () {
    return Session.get('sort') === this.value;
  }
});
