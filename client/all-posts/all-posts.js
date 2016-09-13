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
Template.toolbarSort.helpers({
  'sortMethods': function () {
    return constants.SORT_METHODS;
  },
  'selected': function () {
    return Session.get('sort') === this.value;
  }
});
Template.toolbarSort.events({
  'click .sort-method': function (event) {
    event.preventDefault();
    Session.set('sort', this.value);
    localStorage.setItem('sort', this.value);
  }
});
Template.toolbarSort.rendered = () => {
  $('.template-toolbarSort').dropdown({
    inDuration: 0,
    outDuration: 0,
    constrain_width: false, // does not change width of dropdown to that of the activator
    hover: false, // activate on hover
    gutter: 0, // spacing from edge
    belowOrigin: false, // aisplays dropdown below the button
    alignment: 'left' // displays dropdown with edge aligned to the left of button
  });
};
