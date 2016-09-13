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
    return _.sortBy(this.comments, (object) => {
      return -1 * (new Date(object.date));
    });
  },
  empty: function () {
    return this.comments.length === 0;
  },
  time: function () {
    return moment(this.date).format('h:mm:ss A');
  },
  distance: function () {
    const position = JSON.parse(Session.get('position'));
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
Template.comment.helpers({
	content: function() {
		return this.content;
	},
	date: function() {
		return this.date;
	}
});

// change thing to other thing
