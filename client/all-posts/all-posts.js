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
    const position = Session.get('position');
    const options = {
      age: { sort: { date: -1  } },
      distance: {},
      popularity: { sort: { commentCount: -1 } }
    }[Session.get('sort')]; // possible values are defined in constants.js
    return constants.POSTS.find({
      'location': {
        '$near': {
          '$geometry': {
            'type': 'Point',
            'coordinates': [position.longitude, position.latitude]
          }
        }
      }
    }, options);
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
    return utilities.format(utilities.distance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), constants.UNITS.distance, false);
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
