import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

function triggerComment (id) {
  const post = id;
  const comment = $('.text-input').val();
  if (comment.length === 0) {
    return; // fail silently if comment is empty
  }
  if (! utilities.checkPost(comment)) {
    alert('Invalid comment.');
    return;
  }
  Meteor.call('posts.comment', comment, post);
  $('.text-input').val('');
  $('.text-input').trigger('input'); // make sure value gets reset
}

Template.viewPost.helpers({
  comments: function () {
    /*return _.sortBy(this.comments, (object) => {
      return -1 * (new Date(object.date));
    });*/
    return this.comments.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  },
  empty: function () {
    return this.commentCount === 0;
  },
  time: function () {
    return moment(this.date).format('h:mm:ss A');
  },
  distance: function () {
    let position = Session.get('position');
    if (! position) return;
    position = JSON.parse(position);
    return utilities.format(geolib.getDistance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), constants.UNITS.distance, true);
  },
  location: function() {
    return `https://www.google.com/maps/search/${this.location.coordinates[1]},${this.location.coordinates[0]}`;
  }
});
Template.viewPost.events({
  'click a': (event) => {
    event.stopPropagation();
  },
  'click .template-toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  },
  'click .post-button': (event, template) => {
    event.preventDefault();
    triggerComment(template.data.id);
  },
  'keydown .text-input': (event, template) => {
    if (event.which === 13) {
      event.preventDefault();
      triggerComment(template.data.id);
    }
  }
});

// change thing to other thing
